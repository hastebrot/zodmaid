import { useLayoutEffect, useRef } from "react";
import { measureElemSize } from "./helpers/measure-elem-size";

export const useFieldSizingTextarea = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    if (ref.current === null) return;
    const elem = ref.current;
    function updateElem() {
      const size = measureElemSize(elem);
      elem.style.width = size.width;
      elem.style.height = size.height;
    }
    updateElem();
    elem.addEventListener("input", updateElem);
    return () => {
      elem.removeEventListener("input", updateElem);
    };
  }, [ref]);
  return { textareaRef: ref };
};
