import { useLayoutEffect, useRef } from "react";
import { measureElemSize } from "./measure-elem-size";

export const useFieldSizingInput = () => {
  const ref = useRef<HTMLInputElement>(null);
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
    const observer = new MutationObserver(updateElem);
    observer.observe(elem, { attributes: true, childList: true });
    return () => {
      elem.removeEventListener("input", updateElem);
      observer.disconnect();
    };
  }, [ref]);
  return { inputRef: ref };
};
