import { Resvg } from "@resvg/resvg-js";
import { describe, test } from "bun:test";

describe("resvg", () => {
  test("bbox", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <text>12345</text>
      </svg>
    `;
    const resvg = new Resvg(svg, {
      font: {
        defaultFontFamily: "monospace",
        defaultFontSize: 12,
      },
    });
    console.log("bbox width", resvg.getBBox()?.width);
  });

  test("png", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <g style="text-anchor: start; dominant-baseline: hanging;">
          <rect width="100%" height="100%" fill="white" />
          <text x="0" y="0" fill="black">12345</text>
        </g>
      </svg>
    `;
    const resvg = new Resvg(svg, {
      background: "white",
      font: {
        defaultFontFamily: "monospace",
        defaultFontSize: 12,
      },
    });
    const png = resvg.render();
    Bun.write("dist/resvg.png", png.asPng());
  });
});
