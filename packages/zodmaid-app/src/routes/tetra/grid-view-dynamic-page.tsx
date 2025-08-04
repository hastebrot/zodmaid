import { useState } from "react";
import { TetraGridViewJsonRoot } from "zodspy/components/tetra/tetra-grid-view-json-root";
import { musicLibrary } from "zodspy/examples/music-library";
import { purchaseOrder } from "zodspy/examples/purchase-order";
import { classNames } from "../../helpers/clsx";
import { useDocumentTitle } from "../../helpers/react";

export const GridViewDynamicPage = () => {
  useDocumentTitle("tetra: grid view dynamic");
  const examples = {
    purchaseOrder,
    musicLibrary,
  };
  const [exampleName, setExampleName] = useState<keyof typeof examples>("musicLibrary");
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  return (
    <div
      className={classNames(
        "h-dvh p-4 bg-(--bg-base) text-(--fg-base)",
        "[scrollbar-color:var(--border-base)_var(--bg-base)]",
        "overflow-auto overscroll-contain",
        // "[font-size-adjust:ex-height_0.5]",
        colorMode === "light" && [
          "[--bg-base:var(--color-gray-100)]",
          "[--border-base:var(--color-gray-400)]",
          "[--fg-base:var(--color-gray-900)]",
          "[--fg-accent:var(--color-blue-700)]",
        ],
        colorMode === "dark" && [
          "[--bg-base:var(--color-zinc-900)]",
          "[--border-base:var(--color-zinc-700)]",
          "[--fg-base:var(--color-zinc-300)]",
          "[--fg-accent:var(--color-sky-500)]",
        ],
      )}
    >
      <div className="flex items-center gap-1.5 pb-3 text-(--fg-accent) underline text-sm">
        <button className="cursor-pointer" onClick={() => setColorMode("light")}>
          light
        </button>
        <button className="cursor-pointer" onClick={() => setColorMode("dark")}>
          dark
        </button>
        <button className="cursor-pointer" onClick={() => setExampleName("purchaseOrder")}>
          purchaseOrder
        </button>
        <button className="cursor-pointer" onClick={() => setExampleName("musicLibrary")}>
          musicLibrary
        </button>
      </div>
      <div className="w-fit h-fit">
        <TetraGridViewJsonRoot key={exampleName} value={examples[exampleName]} theme={colorMode} />
      </div>
    </div>
  );
};
