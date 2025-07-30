export const IrisColorsPage = () => {
  return (
    <div className="grid auto-rows-fr grid-flow-row h-dvh text-sm">
      <div className="flex flex-row text-sm text-black">
        <div className="w-[100px] h-full bg-white">bg-base</div>
        <div className="w-[100px] h-full bg-zinc-100">bg-layer</div>
        <div className="w-[100px] h-full bg-zinc-200">bg-layer-active</div>
        <div className="w-[100px] h-full bg-zinc-800">fg-base</div>
        <div className="w-[100px] h-full bg-zinc-600">fg-subtle</div>
        <div className="w-[100px] h-full bg-zinc-400">fg-muted</div>
        <div className="w-[100px] h-full bg-zinc-200">border-base</div>
        <div className="w-[100px] h-full bg-zinc-300">border-active</div>
        <div className="w-[100px] h-full bg-blue-500">fg-accent</div>
        <div className="w-[100px] h-full bg-blue-100">bg-accent</div>
        <div className="w-[100px] h-full bg-yellow-100">bg-highlight</div>
        <div className="w-[100px] h-full bg-yellow-400">border-highlight</div>
      </div>
      <div className="flex flex-row text-sm text-white">
        <div className="w-[100px] h-full bg-neutral-900">bg-base</div>
        <div className="w-[100px] h-full bg-neutral-800">bg-layer</div>
        <div className="w-[100px] h-full bg-neutral-700">bg-layer-active</div>
        <div className="w-[100px] h-full bg-neutral-200">fg-base</div>
        <div className="w-[100px] h-full bg-neutral-400">fg-subtle</div>
        <div className="w-[100px] h-full bg-neutral-500">fg-muted</div>
        <div className="w-[100px] h-full bg-neutral-700">border-base</div>
        <div className="w-[100px] h-full bg-neutral-600">border-active</div>
        <div className="w-[100px] h-full bg-sky-300">fg-accent</div>
        <div className="w-[100px] h-full bg-slate-700">bg-accent</div>
        <div className="w-[100px] h-full bg-yellow-100">bg-highlight</div>
        <div className="w-[100px] h-full bg-yellow-400">border-highlight</div>
      </div>
    </div>
  );
};

// light mode
// white: white
// red: rose-600
// orange: orange-400
// yellow: amber-300
// green: green-400
// blue: indigo-500
// purple: purple-700
// black: zinc-800

// dark mode
// white: white
// red:
// orange: orange-900
// yellow: yellow-800
// green green-800
// blue: sky-900
// purple: violet-900
// black: zinc-700
