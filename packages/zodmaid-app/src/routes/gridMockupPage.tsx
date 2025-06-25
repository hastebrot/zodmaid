import { classNames } from "../helpers/clsx";

export const GridMockupPage = () => {
  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <Row>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="comment">{`//`}</JsonType>
              <JsonComment>
                Switch to grid view to enjoy new features like filters and formulas.
              </JsonComment>
            </div>
          </div>
        </Cell>
      </Row>
      <Row>
        <Cell variant="yellow">
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`f(x)`}</JsonType>
              <JsonKey>subTotal</JsonKey>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start min-w-[350px]">
            <div className="flex gap-1 items-center">
              <JsonValue>
                <span className="font-[monospace]">?price * ?quantity</span>
              </JsonValue>
            </div>
          </div>
        </Cell>
      </Row>
      <Row>
        <Cell variant="green">
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`f(x)`}</JsonType>
              <JsonKey>subTotal</JsonKey>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start min-w-[350px]">
            <div className="flex gap-1 items-center">
              <JsonValue></JsonValue>
            </div>
          </div>
        </Cell>
      </Row>
      <Row>
        <Cell variant="blue">
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`f(x)`}</JsonType>
              <JsonKey>subTotal</JsonKey>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start min-w-[350px]">
            <div className="flex gap-1 items-center">
              <JsonValue></JsonValue>
            </div>
          </div>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <div className="flex gap-1 items-start">
            <GridExpand />
            <div className="flex gap-1 items-center">
              <JsonType variant="composite">{`[]`}</JsonType>
              <JsonKey>items</JsonKey>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <GridExpand />
            <div className="flex gap-1 items-center">
              <JsonType variant="composite">{`{}`}</JsonType>
              <JsonIndex>5</JsonIndex>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <GridExpand />
            <div className="flex gap-1 items-center">
              <JsonType variant="composite">{`<>`}</JsonType>
              <JsonIndex>15</JsonIndex>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`"A"`}</JsonType>
              <JsonValue>123-456-7890</JsonValue>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`#`}</JsonType>
              <JsonValue>0.79</JsonValue>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`?`}</JsonType>
              <JsonValue>false</JsonValue>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`Ø`}</JsonType>
              <JsonValue>null</JsonValue>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`$$`}</JsonType>
              <JsonValue>12.50 EUR</JsonValue>
            </div>
          </div>
        </Cell>
        <Cell>
          <div className="flex gap-1 items-start">
            <div className="flex gap-1 items-center">
              <JsonType variant="primitive">{`DT`}</JsonType>
              <JsonValue>2025-06-25</JsonValue>
            </div>
          </div>
        </Cell>
      </Row>
    </div>
  );
};

const GridExpand = () => {
  return (
    <div
      className={classNames(
        "h-full min-h-[50px] w-[16px] mb-[-5px] my-[-1px] bg-gray-300",
        "border-gray-500 border-l-white border-t-white border",
        "outline-gray-300 outline outline-offset-0",
      )}
    >
      <div className="inline-block scale-60 origin-top-left">{caretUp}</div>
    </div>
  );
};

const JsonComment = (props: { children?: React.ReactNode }) => {
  return <div className="font-[400] text-sm/none text-green-700">{props.children}</div>;
};

const JsonIndex = (props: { children?: React.ReactNode }) => {
  return <div className="font-[700] text-sm/none text-zinc-400">{props.children}</div>;
};

const JsonValue = (props: { children?: React.ReactNode }) => {
  return <div className="font-[400] text-sm/none">{props.children}</div>;
};

const JsonKey = (props: { children?: React.ReactNode }) => {
  return <div className="font-[700] text-sm/none">{props.children}</div>;
};

const JsonType = (props: {
  children?: React.ReactNode;
  variant: "composite" | "primitive" | "comment";
}) => {
  return (
    <div
      className={classNames(
        "min-w-[10px] font-mono text-xs/none",
        props.variant === "composite" && [
          "text-shadow-rose-900 text-shadow-2xs text-rose-700 font-[700]",
          "tracking-[0.25em]",
        ],
        props.variant === "primitive" && "text-sky-700 font-[700]",
        props.variant === "comment" && "text-green-700 font-[700]",
      )}
    >
      {props.children}
    </div>
  );
};

const Row = (props: { children?: React.ReactNode }) => {
  return (
    <div className="w-fit grid auto-cols-min grid-flow-col first:border-t border-gray-400">
      {props.children}
    </div>
  );
};

const Cell = (props: { children?: React.ReactNode; variant?: "yellow" | "green" | "blue" }) => {
  return (
    <div
      className={classNames(
        "w-[max-content] px-1 pr-2 py-1 pb-2",
        "first:border-l border-b border-r border-gray-400",
        props.variant === "yellow" && "bg-yellow-200",
        props.variant === "green" && "bg-lime-200",
        props.variant === "blue" && "bg-sky-200",
      )}
    >
      {props.children}
    </div>
  );
};

const caretUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="icon icon-tabler icons-tabler-filled icon-tabler-caret-up"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" />
  </svg>
);
