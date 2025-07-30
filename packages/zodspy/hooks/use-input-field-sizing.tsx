import { useLayoutEffect, useRef, type CSSProperties } from "react";

// tested with <input>. not tested with <input type="file">, <textarea>, <select>.
export const useInputFieldSizing = () => {
  // `field-sizing: content` overrides the default preferred sizing of form elements.
  // This setting provides an easy way to configure text inputs to shrinkwrap their
  // content and grow as more text is entered. They stop expanding when they reach
  // maximum size limits (defined by the size of their containing element or set via
  // CSS), at which point scrolling is required to view all the content.
  const ref = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (ref.current === null) return;
    const input = ref.current;
    function updateInputStyle() {
      const size = measureInputSize(input);
      input.style.width = size.width;
      input.style.height = size.height;
    }
    updateInputStyle();
    input.addEventListener("input", updateInputStyle);
    return () => {
      input.removeEventListener("input", updateInputStyle);
    };
  }, [ref]);
  return { inputRef: ref };
};

export const measureInputSize = (input: HTMLInputElement) => {
  // span text.
  const text = input.value === "" ? input.placeholder : input.value;
  const span = document.createElement("span");
  span.innerText = text;

  // span styles.
  const styles = window.getComputedStyle(input);
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
  whiteSpace: "pre",
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
  return "";
};
