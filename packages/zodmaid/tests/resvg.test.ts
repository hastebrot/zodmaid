import { Resvg } from "@resvg/resvg-js";
import { describe, test } from "bun:test";

describe("resvg", () => {
  test("bbox", async () => {
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
});
