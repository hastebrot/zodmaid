import { useEffect, useRef } from "react";
import { HillChart, type HillChartData } from "../../components/iris-hill-chart";
import { useDocumentTitle } from "../../helpers/react";

export const IrisHillChartPage = () => {
  useDocumentTitle("iris: hill chart");
  const data = {
    title: "Benjamin G.",
    description: "14-Aug-25 at 14:30",
    items: [
      {
        title: "#46 Render chart and edit progress",
        scope: "Hill charts",
        color: hashStringToColor("Hill charts"),
        progressX: 50,
      },
      {
        title: "#47 Edit chart table data",
        scope: "Hill charts",
        color: hashStringToColor("Hill charts"),
        progressX: 0,
      },
      {
        title: "#48 Update chart history",
        scope: "Hill charts",
        color: hashStringToColor("Hill charts"),
        progressX: 0,
      },
      {
        title: "#50 Extract tetra module",
        scope: "Modules",
        color: hashStringToColor("Modules"),
        progressX: 0,
      },
      {
        title: "#51 Extract tri module",
        scope: "Modules",
        color: hashStringToColor("Modules"),
        progressX: 0,
      },
    ],
    // title: "John D.",
    // description: "11-Aug-25 at 15:30",
    // items: [
    //   { title: randWords(), color: "orange", progressX: 0 },
    //   { title: randWords(), color: "orange", progressX: 0 },
    //   { title: randWords(), color: "orange", progressX: 20 },
    //   { title: randWords(), color: "red", progressX: 40 },
    //   { title: randWords(), color: "red", progressX: 50 },
    //   { title: randWords(), color: "red", progressX: 50 },
    //   { title: randWords(), color: "blue", progressXx: 70 },
    //   { title: randWords(), color: "green", progressX: 70 },
    //   { title: randWords(), color: "green", progressX: 70 },
    //   { title: randWords(), color: "cyan", progressX: 80 },
    //   { title: randWords(), color: "cyan", progressX: 80 },
    //   { title: randWords(), color: "blue", progressX: 100 },
    //   { title: randWords(), color: "blue", progressX: 100 },
    //   { title: randWords(), color: "blue", progressX: 100 },
    // ],
  };

  return (
    <div className="m-4 p-4 border border-zinc-500">
      <IrisHillChart data={data} />
    </div>
  );
};

export type IrisHillChartProps = {
  data: HillChartData;
  height?: number;
};

export const IrisHillChart = (props: IrisHillChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const render = () => {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    const svg = new HillChart().render(props.data, width, props.height ?? 250);
    ref.current.replaceChildren(svg);
  };
  useEffect(() => {
    render();
    const observer = new ResizeObserver(() => render());
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [props.data, props.height]);

  return <div ref={ref}></div>;
};

const randWords = (minWords = 2, maxWords = 5) => {
  // prettier-ignore
  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod",
    "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim",
    "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  ];
  const pickItem = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
  };
  const generateLorem = (count: number) => {
    return Array.from({ length: count }, () => pickItem(loremWords)).join(" ");
  };
  const randNumber = (minNumber: number, maxNumber: number) => {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  };
  return generateLorem(randNumber(minWords, maxWords));
};

const sdbmHash = (input: string): number => {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = input.charCodeAt(index) + (hash << 6) + (hash << 16) - hash;
  }
  return hash >>> 0;
};

const hashStringToColor = (input: string) => {
  // prettier-ignore
  const rainbowColors = [
    "red", "orange", "yellow", "green", "blue", "indigo", "violet",
    "cyan", "magenta",
  ];
  const hash = Math.abs(sdbmHash(input));
  return rainbowColors[hash % rainbowColors.length];
};
