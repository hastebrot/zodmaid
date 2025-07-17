import { type CSSProperties } from "react";
import { classNames } from "../../helpers/clsx";

export type TanaBulletProps = {
  children?: React.ReactNode;
  variant: "point" | "button" | "action" | "field";
  color?: "gray" | "orange" | "magenta" | "blue" | "green";
  textSlot?: React.ReactNode;
  hasOutline?: boolean;
  hasOutlineBorder?: boolean;
};

export const TanaBullet = (props: TanaBulletProps) => {
  let style = {} as CSSProperties;
  if (props.color === undefined) {
    style = {
      "--color-300": "var(--color-zinc-300)",
      "--color-500": "var(--color-zinc-500)",
      "--color-700": "var(--color-zinc-700)",
    } as CSSProperties;
  }
  if (props.color === "gray") {
    style = {
      "--color-300": "var(--color-zinc-600)",
      "--color-500": "var(--color-zinc-950)",
      "--color-700": "var(--color-zinc-950)",
    } as CSSProperties;
  }
  if (props.color === "orange") {
    style = {
      "--color-300": "var(--color-amber-600)",
      "--color-500": "var(--color-amber-950)",
      "--color-700": "var(--color-amber-950)",
    } as CSSProperties;
  }
  if (props.color === "magenta") {
    style = {
      "--color-300": "var(--color-fuchsia-600)",
      "--color-500": "var(--color-fuchsia-950)",
      "--color-700": "var(--color-fuchsia-950)",
    } as CSSProperties;
  }
  if (props.color === "blue") {
    style = {
      "--color-300": "var(--color-blue-600)",
      "--color-500": "var(--color-blue-950)",
      "--color-700": "var(--color-blue-950)",
    } as CSSProperties;
  }
  if (props.color === "green") {
    style = {
      "--color-300": "var(--color-green-600)",
      "--color-500": "var(--color-green-950)",
      "--color-700": "var(--color-green-950)",
    } as CSSProperties;
  }

  if (props.variant === "point") {
    return (
      <div style={style} className="size-(--bullet-size) flex items-center justify-center">
        <div role="button" className="relative flex items-center justify-center">
          <div className="absolute z-10 inset-0 self-center justify-self-center size-(--bullet-point-size) bg-(--color-300) rounded-full"></div>
          <div
            className={classNames(
              "size-(--bullet-size) rounded-full bg-transparent outline outline-transparent outline-dashed",
              props.hasOutline && "!bg-(--color-700)",
              props.hasOutlineBorder && "!outline-(--color-300)",
            )}
          ></div>
        </div>
      </div>
    );
  }
  if (props.variant === "field") {
    return (
      <div style={style} className="size-(--bullet-size) flex items-center justify-center">
        <div role="button" className="flex items-center justify-center">
          <div className="flex items-center justify-center size-(--bullet-field-size) text-(--color-300) outline outline-(--color-300) rounded-[3px] overflow-clip">
            {props.children}
          </div>
        </div>
      </div>
    );
  }
  if (props.variant === "button") {
    return (
      <div style={style} className="size-(--bullet-size) flex items-center justify-center">
        <div role="button" className="flex items-center justify-center">
          <div className="flex items-center justify-center size-(--bullet-field-size) text-(--color-500) outline outline-(--color-500) rounded-full overflow-clip">
            {props.children}
          </div>
        </div>
      </div>
    );
  }
  if (props.variant === "action") {
    return (
      <div
        style={style}
        className={classNames(
          "h-(--bullet-size) flex items-center justify-center gap-0.5 pl-0.5 pr-1 text-(--color-500) outline-2 outline-transparent rounded-[3px]",
          props.hasOutline && "!bg-(--color-700) !outline-(--color-700) !text-(--color-300)",
        )}
      >
        <div role="button" className="flex items-center justify-center">
          <div className="flex items-center justify-center size-(--bullet-field-size) rounded-full overflow-clip">
            {props.children}
          </div>
        </div>
        <div className="flex items-center justify-center text-sm">{props.textSlot}</div>
      </div>
    );
  }
  return null;
};
