import { useEffect, useRef } from "react";
import { HillChart } from "../../components/iris-hill-chart";
import { useDocumentTitle } from "../../helpers/react";

const randText = () => {
  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
  ];
  const pickItem = (items: string[]) => items[Math.floor(Math.random() * items.length)];
  const randNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  function generateLorem(count: number) {
    return Array.from({ length: count }, () => pickItem(loremWords)).join(" ");
  }
  return generateLorem(randNumber(2, 5));
};

const data = {
  title: "John D.",
  description: "11-Aug-25 at 15:30",
  items: [
    { title: randText(), color: "orange", x: 0 },
    { title: randText(), color: "orange", x: 0 },
    { title: randText(), color: "orange", x: 20 },
    { title: randText(), color: "red", x: 40 },
    { title: randText(), color: "red", x: 50 },
    { title: randText(), color: "red", x: 50 },
    { title: randText(), color: "blue", x: 70 },
    { title: randText(), color: "green", x: 70 },
    { title: randText(), color: "green", x: 70 },
    { title: randText(), color: "blue", x: 100 },
    { title: randText(), color: "blue", x: 100 },
    { title: randText(), color: "blue", x: 100 },
  ],
};

export const IrisHillChartPage = () => {
  useDocumentTitle("iris: hill chart");
  const ref = useRef<HTMLDivElement>(null);
  function render() {
    if (!ref.current) return;
    const height = 260;
    const width = ref.current.clientWidth;
    const svg = new HillChart().render(data, width, height);
    if (svg) {
      ref.current.replaceChildren(svg);
    } else {
      ref.current.replaceChildren();
    }
  }
  useEffect(() => {
    render();
    window.addEventListener("resize", () => render());
    return () => {
      window.removeEventListener("resize", () => render());
    };
  }, [ref]);

  return (
    <div className="m-4 p-4 border border-[#33322E]">
      <div ref={ref}></div>
    </div>
  );
};
