/// <reference types="@testing-library/jest-dom/vitest" />
import * as matchers from "@testing-library/jest-dom/matchers";
import { diff } from "@vitest/utils/diff";
import pico from "picocolors";
import { expect } from "vitest";

export { matchers };

export function registerMatchers() {
  function patchJestDomMatchers(matchers: object) {
    return Object.fromEntries(
      Object.entries(matchers).map(([key, value]) => {
        return [key, typeof value === "function" ? patchMatcher(value) : value];
      }),
    );
  }

  function patchMatcher(matcher: any) {
    // https://github.com/jestjs/jest/blob/v30.0.4/packages/jest-matcher-utils/src/index.ts
    return function (...args: any[]) {
      // @ts-ignore
      this.utils.EXPECTED_COLOR = pico.green;
      // @ts-ignore
      this.utils.RECEIVED_COLOR = pico.red;
      // @ts-ignore
      this.utils.diff = diff;
      // @ts-ignore
      this.utils.stringify = (value: any) => String(value);
      // @ts-ignore
      return matcher.apply(this, args);
    };
  }

  expect.extend(patchJestDomMatchers(matchers));
}

registerMatchers();
