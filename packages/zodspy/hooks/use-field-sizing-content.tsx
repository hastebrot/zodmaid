import { useLayoutEffect, useRef, type CSSProperties, type RefObject } from "react";

// tested with <input> and <textarea>.
// not tested with <input type="file"> and <select>.
export const useFieldSizingContent = () => {
  // `field-sizing: content` overrides the default preferred sizing of form elements.
  // This setting provides an easy way to configure text inputs to shrinkwrap their
  // content and grow as more text is entered. They stop expanding when they reach
  // maximum size limits (defined by the size of their containing element or set via
  // CSS), at which point scrolling is required to view all the content.
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    if (ref.current === null) return;
    const element = ref.current;
    function updateElementStyle() {
      const text = element.value === "" ? element.placeholder : element.value;
      const size = measureElementSize(element, text);
      element.style.width = size.width;
      element.style.height = size.height;
    }
    updateElementStyle();
    element.addEventListener("input", updateElementStyle);
    return () => {
      element.removeEventListener("input", updateElementStyle);
    };
  }, [ref]);
  return {
    inputRef: ref as RefObject<HTMLInputElement | null>,
    textAreaRef: ref as RefObject<HTMLTextAreaElement | null>,
  };
};

const measureElementSize = (elem: HTMLElement, text: string) => {
  const ZERO_WIDTH_SPACE = "\u200B";

  // span text.
  const span = document.createElement("span");
  span.innerText = text + ZERO_WIDTH_SPACE;

  // span styles.
  const styles = window.getComputedStyle(elem);
  Object.assign(span.style, defaultStyles);
  for (const styleName of inheritedStyles) {
    Object.assign(span.style, { [styleName]: styles[styleName] });
  }

  // span size.
  document.body.appendChild(span);
  const width = span.scrollWidth;
  const height = span.scrollHeight;
  document.body.removeChild(span);

  return {
    width: toStyleLength(width),
    height: toStyleLength(height),
  };
};

const defaultStyles: CSSProperties = {
  all: "initial",
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "0px",
  height: "0px",
  visibility: "hidden",
  overflow: "scroll",
  whiteSpace: "pre", // equivalent to preserve nowrap.
} as const;

const inheritedStyles: Array<keyof CSSStyleDeclaration> = [
  "font",
  "letterSpacing",
  "textTransform",
  "fontKerning",
  "fontOpticalSizing",
  "fontSizeAdjust",
  "fontStretch",
  "fontVariant",
  "fontVariationSettings",
  "fontSynthesis",
  "textIndent",
] as const;

const toStyleLength = (length: string | number | null | void): string => {
  if (typeof length === "number") {
    return `${length}px`;
  }
  if (typeof length === "string") {
    return length;
  }
  return "0px";
};
