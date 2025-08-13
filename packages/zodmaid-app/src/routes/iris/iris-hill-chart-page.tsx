import { useEffect, useRef } from "react";
import { HillChart, type HillChartData } from "../../components/iris-hill-chart";
import { useDocumentTitle } from "../../helpers/react";

export const IrisHillChartPage = () => {
  useDocumentTitle("iris: hill chart");
  const data = {
    // title: "Benjamin G.",
    // description: "13-Aug-25 at 13:30",
    // items: [
    //   { title: "#46 Render chart and edit progress", color: "gray", x: 15 },
    //   { title: "#47 Edit chart table data", color: "gray", x: 0 },
    //   { title: "#48 Update chart history", color: "gray", x: 0 },
    // ],
    title: "John D.",
    description: "11-Aug-25 at 15:30",
    items: [
      { title: randWords(), color: "orange", x: 0 },
      { title: randWords(), color: "orange", x: 0 },
      { title: randWords(), color: "orange", x: 20 },
      { title: randWords(), color: "red", x: 40 },
      { title: randWords(), color: "red", x: 50 },
      { title: randWords(), color: "red", x: 50 },
      { title: randWords(), color: "blue", x: 70 },
      { title: randWords(), color: "green", x: 70 },
      { title: randWords(), color: "green", x: 70 },
      { title: randWords(), color: "cyan", x: 80 },
      { title: randWords(), color: "cyan", x: 80 },
      { title: randWords(), color: "blue", x: 100 },
      { title: randWords(), color: "blue", x: 100 },
      { title: randWords(), color: "blue", x: 100 },
    ],
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
  function render() {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    const svg = new HillChart().render(props.data, width, props.height ?? 250);
    ref.current.replaceChildren(svg);
  }
  useEffect(() => {
    render();
    const observer = new ResizeObserver(() => render());
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

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
