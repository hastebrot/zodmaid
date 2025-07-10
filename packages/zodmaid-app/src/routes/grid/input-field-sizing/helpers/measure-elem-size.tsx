import type { CSSProperties } from "react";

export const measureElemSize = (elem: HTMLInputElement | HTMLTextAreaElement) => {
  // text.
  const text = elem.value === "" ? elem.placeholder : elem.value;
  const div = document.createElement("span");
  div.innerText = text;

  // styles.
  const styles = window.getComputedStyle(elem);
  Object.assign(div.style, defaultStyles);
  for (const styleName of inheritedStyles) {
    Object.assign(div.style, { [styleName]: styles[styleName] });
  }
  if (elem instanceof HTMLTextAreaElement) {
    const zeroWidthSpace = "\u200B";
    div.innerText += zeroWidthSpace;
    Object.assign(div.style, { whiteSpace: "pre-wrap" });
    Object.assign(div.style, { minWidth: styles["minWidth"] });
    Object.assign(div.style, { maxWidth: styles["maxWidth"] });
  }

  // size.
  document.body.appendChild(div);
  const width = div.scrollWidth;
  const height = div.scrollHeight;
  document.body.removeChild(div);

  return {
    width: toLengthString(width),
    height: toLengthString(height),
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

const toLengthString = (length: string | number | null | void): string => {
  if (typeof length === "number") {
    return `${length}px`;
  }
  if (typeof length === "string") {
    return length;
  }
  return "";
};
