/// <reference types="node" />
import { GlobalWindow } from "happy-dom";

export const dom = new GlobalWindow({ url: "http://localhost/" });

export function registerGlobals() {
  const ignoredKeys = ["undefined"];
  for (const key in Object.getOwnPropertyDescriptors(dom)) {
    // @ts-ignore
    if (global[key] === undefined && !ignoredKeys.includes(key)) {
      // @ts-ignore
      global[key] = dom[key];
    }
  }
}

registerGlobals();
