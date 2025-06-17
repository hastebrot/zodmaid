import { Resvg, type ResvgRenderOptions } from "@resvg/resvg-js";

export function measureSvgText(
  text: string[],
  options: ResvgRenderOptions,
  fontWeight: "normal" | "bold" = "normal",
  fontStyle: "normal" | "italic" = "normal"
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      ${text
        .map((it) => {
          return `<text font-weight="${fontWeight}" font-style="${fontStyle}">${it}</text>`;
        })
        .join("")}
    </svg>
  `;
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: options.font?.fontFiles === undefined ? true : false,
      fontFiles: options.font?.fontFiles,
      defaultFontFamily: options.font?.defaultFontFamily,
      defaultFontSize: options.font?.defaultFontSize,
    },
  });
  const bbox = resvg.getBBox();
  return {
    width: bbox?.width ?? 0,
    height: Math.max(text.length * (options.font?.defaultFontSize ?? 0)),
  };
}

export function renderSvgImage(svg: string, options: ResvgRenderOptions) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "zoom", value: 1 },
    background: options.background,
    font: {
      loadSystemFonts: options.font?.fontFiles === undefined ? true : false,
      fontFiles: options.font?.fontFiles,
      defaultFontFamily: options.font?.defaultFontFamily,
      defaultFontSize: options.font?.defaultFontSize,
    },
    shapeRendering: 2, // geometricPrecision
    textRendering: 2, // geometricPrecision
    imageRendering: 0, // optimizeQuality
  });
  return {
    svg: resvg.toString(),
    png: resvg.render().asPng(),
  };
}
