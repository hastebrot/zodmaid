import tablerSpriteFilled from "../../../../node_modules/@tabler/icons-sprite/dist/tabler-sprite-filled.svg";
import tablerSpriteOutlined from "../../../../node_modules/@tabler/icons-sprite/dist/tabler-sprite-nostroke.svg";
import { classNames } from "../helpers/clsx";
import { throwError } from "../helpers/error";

export type IrisIconProps = {
  className?: string;
  name: string;
  variant: "filled" | "outlined";
  width?: number;
  height?: number;
  strokeWidth?: number;
};

export const IrisIcon = (props: IrisIconProps) => {
  // https://tabler.io/icons
  const href =
    props.variant === "filled"
      ? `${tablerSpriteFilled}#tabler-filled-${props.name}`
      : props.variant === "outlined"
        ? `${tablerSpriteOutlined}#tabler-${props.name}`
        : throwError(`invalid variant: "${props.variant}"`);
  const width = props.width ?? props.height ?? 24;
  const height = props.height ?? props.width ?? 24;
  const webfontStrokes = { 200: 1, 300: 1.5, 400: 2 };
  const strokeWidth = props.strokeWidth ?? webfontStrokes[300];

  return (
    <div className={classNames("inline-flex", props.className)}>
      <svg width={width} height={height} strokeWidth={strokeWidth}>
        <use xlinkHref={href} />
      </svg>
    </div>
  );
};
