import type { CSSProperties } from "react";

export const measureElemSize = (elem: HTMLInputElement | HTMLTextAreaElement) => {
  // span text.
  const text = elem.value === "" ? elem.placeholder : elem.value;
  const span = document.createElement("span");
  span.innerText = text;

  // span styles.
  const styles = window.getComputedStyle(elem);
  Object.assign(span.style, defaultStyles);
  for (const styleName of inheritedStyles) {
    Object.assign(span.style, { [styleName]: styles[styleName] });
  }
  if (elem instanceof HTMLTextAreaElement) {
    const zeroWidthSpace = "\u200B";
    span.innerText += zeroWidthSpace;
    Object.assign(span.style, { whiteSpace: "pre-wrap" });
    Object.assign(span.style, { minWidth: styles["minWidth"] });
    Object.assign(span.style, { maxWidth: styles["maxWidth"] });
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
