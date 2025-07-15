import { type CSSProperties } from "react";
import { classNames } from "../../helpers/clsx";

export const TanaOutlinerPage = () => {
  return (
    <div className="min-h-dvh overflow-auto p-8 bg-zinc-900 text-zinc-300">
      <TanaTheme>
        <div className="flex flex-col gap-1.5 font-sans text-(size:--text-font-size)/(--text-line-height)">
          <div className="flex items-center gap-2.5">
            <OutlineBullet variant="point" />
            <OutlineBullet variant="point" hasOutline />
            <OutlineBullet variant="point" hasOutlineBorder />
            <OutlineBullet variant="point" hasOutlineBorder hasOutline />
            <span>Person</span>
          </div>
          <div className="flex items-center gap-2.5">
            <OutlineBullet variant="button">
              <OutlineBulletIcon iconSlot={iconArrowForwardUp} />
            </OutlineBullet>
            <OutlineBullet variant="button">
              <OutlineBulletIcon iconSlot={iconPlus} />
            </OutlineBullet>
            <OutlineBullet variant="button">
              <OutlineBulletIcon iconSlot={iconChevronDown} />
            </OutlineBullet>
            <OutlineBullet variant="button">
              <OutlineBulletIcon iconSlot={iconChevronDown} style={{ rotate: "-90deg" }} />
            </OutlineBullet>
            <span>Person</span>
            <OutlineBullet variant="action" textSlot="Person">
              <OutlineBulletIcon iconSlot={iconPlus} />
            </OutlineBullet>
            <OutlineBullet variant="action" textSlot="person" hasOutline>
              <OutlineBulletIcon iconSlot={iconHash} />
            </OutlineBullet>
          </div>
          <div className="flex items-center gap-2.5">
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon
                iconSlot={iconAlphabetLatin}
                style={{ scale: 1.3, translate: "0 -0.25px" }}
              />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon
                iconSlot={iconNumber12}
                style={{ scale: 1.45, translate: "0 0.25px" }}
              />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconHash} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconList} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconAt} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconUser} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconLink} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconCheck} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconClockHour4} />
            </OutlineBullet>
            <OutlineBullet variant="field">
              <OutlineBulletIcon iconSlot={iconCurrencyDollar} />
            </OutlineBullet>
            <span>Person</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <OutlineBullet variant="point" color="orange" />
            <span>Person</span>
            <OutlineBullet variant="action" textSlot="person" hasOutline color="orange">
              <OutlineBulletIcon iconSlot={iconHash} />
            </OutlineBullet>
          </div>
          <OutlineList>
            <OutlineField>
              <div className="flex items-center gap-1">
                <OutlineBullet variant="action" textSlot="Phone">
                  <OutlineBulletIcon iconSlot={iconPlus} />
                </OutlineBullet>
                <OutlineBullet variant="action" textSlot="Department">
                  <OutlineBulletIcon iconSlot={iconPlus} />
                </OutlineBullet>
              </div>
            </OutlineField>
            <OutlineField>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field" color="orange">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>Works in</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="magenta" hasOutline />
                <span>Company</span>
                <OutlineBullet variant="action" textSlot="company" hasOutline color="magenta">
                  <OutlineBulletIcon iconSlot={iconHash} />
                </OutlineBullet>
              </div>
            </OutlineField>
            <OutlineField>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field" color="orange">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>Role</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
            </OutlineField>
            <OutlineField>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field" color="orange">
                  <OutlineBulletIcon iconSlot={iconAt} />
                </OutlineBullet>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
            </OutlineField>
            <div className="flex items-center gap-2">
              <OutlineBullet variant="point" />
              <span>Text</span>
            </div>
            <OutlineList>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" />
                <span>Text</span>
              </div>
            </OutlineList>
            <div className="flex items-center gap-2">
              <OutlineBullet variant="point" hasOutline />
              <span>Text</span>
            </div>
            <div className="flex items-center gap-2">
              <OutlineBullet variant="point" hasOutline />
              <span>Text</span>
            </div>
            <div className="flex items-center gap-2">
              <OutlineBullet variant="point" color="gray" />
              <span>&nbsp;</span>
            </div>
          </OutlineList>
          <div className="flex items-center gap-2 mt-1.5">
            <OutlineBullet variant="point" color="magenta" />
            <span>Company</span>
            <OutlineBullet variant="action" textSlot="company" hasOutline color="magenta">
              <OutlineBulletIcon iconSlot={iconHash} />
            </OutlineBullet>
          </div>
          <OutlineList>
            <OutlineField>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field" color="magenta">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>People</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="orange" hasOutline />
                <span>Person</span>
                <OutlineBullet variant="action" textSlot="person" hasOutline color="orange">
                  <OutlineBulletIcon iconSlot={iconHash} />
                </OutlineBullet>
              </div>
            </OutlineField>
            <div className="flex items-center gap-2">
              <OutlineBullet variant="point" color="gray" />
              <span>&nbsp;</span>
            </div>
          </OutlineList>
          <div className="flex items-center gap-2 mt-1.5">
            <OutlineBullet variant="point" />
            <span>Table</span>
          </div>
          <OutlineList>
            <OutlineField>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>Column</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>Column</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>Column</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="field">
                  <OutlineBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                </OutlineBullet>
                <span>Column</span>
              </div>
            </OutlineField>
            <OutlineField>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <OutlineBullet variant="point" />
                  <span>Text</span>
                </div>
                <OutlineList>
                  <div className="flex items-center gap-2">
                    <OutlineBullet variant="point" />
                    <span>Text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <OutlineBullet variant="point" />
                    <span>Text</span>
                  </div>
                </OutlineList>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
            </OutlineField>
            <OutlineField>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <OutlineBullet variant="point" />
                  <span>Text</span>
                </div>
                <OutlineList>
                  <div className="flex items-center gap-2">
                    <OutlineBullet variant="point" />
                    <span>Text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <OutlineBullet variant="point" />
                    <span>Text</span>
                  </div>
                </OutlineList>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineBullet variant="point" color="gray" />
                <span>&nbsp;</span>
              </div>
            </OutlineField>
            <div className="flex items-center gap-2">
              <OutlineBullet variant="point" color="gray" />
              <span>&nbsp;</span>
            </div>
          </OutlineList>
        </div>
      </TanaTheme>
    </div>
  );
};

const TanaTheme = (props: { children?: React.ReactNode }) => {
  const style = {
    "--bullet-size": "17px",
    "--bullet-field-size": "12px",
    "--bullet-icon-size": "12px",
    "--bullet-point-size": "7px",
    "--text-font-size": "15px",
    "--text-line-height": "21px",
  } as CSSProperties;
  return <div style={style}>{props.children}</div>;
};

const OutlineList = (props: { children?: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col gap-1.5 pl-[calc(var(--bullet-size)*2)]">
      <div className="absolute left-0 top-0 bottom-0 w-(--bullet-size) h-full flex justify-center ">
        <button className="w-[1px] h-full bg-(--color-gray-700) rounded-[4px]"></button>
      </div>
      {props.children}
    </div>
  );
};

const OutlineField = (props: { children?: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[repeat(10,minmax(140px,max-content))] grid-flow-col items-start gap-4 pt-1 pb-1.5 border-b border-zinc-700">
      {props.children}
    </div>
  );
};

type OutlineBulletProps = {
  children?: React.ReactNode;
  variant: "point" | "button" | "action" | "field";
  color?: "gray" | "orange" | "magenta" | "blue" | "green";
  textSlot?: React.ReactNode;
  hasOutline?: boolean;
  hasOutlineBorder?: boolean;
};

const OutlineBullet = (props: OutlineBulletProps) => {
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
        <div className="flex items-center justify-center">{props.textSlot}</div>
      </div>
    );
  }
  return null;
};

const OutlineBulletIcon = (props: { iconSlot?: React.ReactNode; style?: CSSProperties }) => {
  return (
    <span
      className="flex size-(--bullet-icon-size) items-center justify-center"
      style={props.style}
    >
      {props.iconSlot}
    </span>
  );
};

export const iconCursorText = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-cursor-text"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 4a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3" />
    <path d="M15 4a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3" />
  </svg>
);

export const iconHash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-hash"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 9l14 0" />
    <path d="M5 15l14 0" />
    <path d="M11 4l-4 16" />
    <path d="M17 4l-4 16" />
  </svg>
);

export const iconList = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-list"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 6l11 0" />
    <path d="M9 12l11 0" />
    <path d="M9 18l11 0" />
    <path d="M5 6l0 .01" />
    <path d="M5 12l0 .01" />
    <path d="M5 18l0 .01" />
  </svg>
);

export const iconUser = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-user"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);

export const iconAt = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-at"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
  </svg>
);

export const iconNumber12 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-number-12-small"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 8h1v8" />
    <path d="M13 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3" />
  </svg>
);

export const iconAlphabetLatin = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-alphabet-latin"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6 10h2a2 2 0 0 1 2 2v5h-3a2 2 0 1 1 0 -4h3" />
    <path d="M14 7v10" />
    <path d="M14 10m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z" />
  </svg>
);

export const iconLink = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-link"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 15l6 -6" />
    <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
    <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
  </svg>
);

export const iconCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-check"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
  </svg>
);

export const iconClockHour4 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l3 2" />
    <path d="M12 7v5" />
  </svg>
);

export const iconPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </svg>
);

export const iconChevronDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6 9l6 6l6 -6" />
  </svg>
);

export const iconSearch = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-search"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>
);

export const iconCurrencyDollar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-currency-dollar"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
    <path d="M12 3v3m0 12v3" />
  </svg>
);

const iconArrowForwardUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-forward-up"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15 14l4 -4l-4 -4" />
    <path d="M19 10h-11a4 4 0 1 0 0 8h1" />
  </svg>
);
