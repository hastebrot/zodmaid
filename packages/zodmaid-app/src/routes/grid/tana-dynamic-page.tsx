import { useEffect, type CSSProperties } from "react";
import { z } from "zod/v4";
import { throwError } from "zodmaid/engines/dagreEngine";
import {
  BaseCell,
  BaseGrid,
  BaseGridView,
  BaseRow,
  defineGridContext,
  type BaseCellProps,
  type BaseRowProps,
  type GridContextProps,
} from "zodspy";
import { TanaBullet } from "zodspy/components/tana/tana-bullet";
import { TanaCellContext } from "zodspy/components/tana/tana-cell-context";
import { TanaCellRenderer } from "zodspy/components/tana/tana-cell-renderer";
import {
  iconAt,
  iconCheck,
  iconCode,
  iconCursorText,
  iconHash,
} from "zodspy/components/tana/tana-icons";
import { musicLibrary } from "zodspy/examples/music-library";
import { MusicLibrarySchema } from "zodspy/examples/music-library-schema";
import { classNames } from "../../helpers/clsx";

// TODO: fold and unfold nodes.
// TODO: toolbar with toggle overlay, floating toolbar overlay
// TODO: state management with owner/key.

export type TanaDataModel = {
  title: string;
  description?: string;
  type: string;
  tags?: string[];
  items: TanaDataModel[];
  isFolded?: boolean;
  useFieldView?: boolean;
  useTableView?: boolean;
};

export const TanaDynamicPage = () => {
  useEffect(() => {
    const data = MusicLibrarySchema.parse(musicLibrary);
    const schema = z.toJSONSchema(MusicLibrarySchema);
    console.log(data, schema);
  }, []);
  const rows: TanaDataModel[] = [
    {
      title: "Person name",
      type: "node",
      tags: ["Person"],
      useFieldView: true,
      items: [
        {
          title: "Company",
          description: "Name of the organization",
          type: "field:node",
          items: [
            // wrap.
            { title: "Company name", type: "node", tags: ["Company"], items: [] },
          ],
        },
        {
          title: "Role",
          description: "Job title of the person",
          type: "field:node",
          items: [
            // wrap.
            { title: "", type: "node", items: [] },
          ],
        },
        {
          title: "Email",
          type: "field:email",
          items: [
            // wrap.
            { title: "", type: "node", items: [] },
          ],
        },
        {
          title: "Text",
          type: "node",
          items: [
            // wrap.
            { title: "Text", type: "node", items: [] },
          ],
        },
        { title: "Text", type: "node", items: [], isFolded: true },
        { title: "Text", type: "node", items: [], isFolded: true },
      ],
    },
    {
      title: "Company name",
      type: "node",
      tags: ["Company"],
      useFieldView: true,
      items: [
        {
          title: "People",
          type: "node",
          items: [
            // wrap.
            { title: "Person name", type: "node", tags: ["Person"], items: [] },
          ],
        },
      ],
    },
    {
      title: "Album",
      type: "field:tag",
      items: [
        // wrap.
        {
          title: "Name",
          type: "field:node",
          items: [{ title: "", type: "node", items: [] }],
        },
        {
          title: "Genre",
          type: "field:node",
          items: [
            {
              title: "",
              type: "node",
              items: [],
            },
          ],
        },
        {
          title: "ReleaseDate",
          type: "field:node",
          items: [
            {
              title: "Pattern",
              type: "field:code",
              items: [{ title: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$", type: "node", items: [] }],
            },
            {
              title: "",
              type: "node",
              items: [],
            },
          ],
        },
        {
          title: "Label",
          type: "field:node",
          items: [
            {
              title: "",
              type: "node",
              items: [],
            },
          ],
        },
        {
          title: "Tracks",
          type: "field:node",
          items: [
            {
              title: "",
              type: "node",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "Track",
      type: "field:tag",
      items: [
        // wrap.
        {
          title: "Title",
          type: "field:node",
          items: [{ title: "", type: "node", items: [] }],
        },
        {
          title: "Duration",
          type: "field:node",
          items: [
            {
              title: "Pattern",
              type: "field:code",
              items: [{ title: "^[0-9]{2}:[0-9]{2}$", type: "node", items: [] }],
            },
            {
              title: "",
              type: "node",
              items: [],
            },
          ],
        },
        {
          title: "Writer",
          type: "field:node",
          items: [
            {
              title: "Optional",
              type: "field:bool",
              items: [{ title: "True", type: "node", items: [] }],
            },
            {
              title: "",
              type: "node",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "Table view",
      type: "node",
      useTableView: true,
      items: [
        {
          title: "Text",
          type: "node",
          tags: ["Instance"],
          items: [
            // wrap.
            { title: "Text", type: "node", items: [] },
            { title: "Text", type: "node", items: [] },
            {
              title: "Field",
              type: "field:node",
              items: [{ title: "", type: "node", items: [] }],
            },
            {
              title: "Field",
              type: "field:node",
              items: [{ title: "", type: "node", items: [] }],
            },
            {
              title: "Field",
              type: "field:node",
              items: [{ title: "", type: "node", items: [] }],
            },
          ],
        },
        {
          title: "Text",
          type: "node",
          tags: ["Instance"],
          items: [
            // wrap.
            { title: "Text", type: "node", items: [] },
            { title: "Text", type: "node", items: [] },
            {
              title: "Field",
              type: "field:node",
              items: [{ title: "", type: "node", items: [] }],
            },
            {
              title: "Field",
              type: "field:node",
              items: [{ title: "", type: "node", items: [] }],
            },
            {
              title: "Field",
              type: "field:node",
              items: [{ title: "", type: "node", items: [] }],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={classNames(
        "h-dvh p-8 bg-(--bg-base) text-(--fg-base)",
        "[scrollbar-color:var(--border-base)_var(--bg-base)]",
        "overflow-auto overscroll-contain",
        [
          "[--bg-base:var(--color-zinc-900)]",
          "[--border-base:var(--color-zinc-700)]",
          "[--fg-base:var(--color-zinc-300)]",
          "[--fg-accent:var(--color-blue-500)]",
        ],
      )}
    >
      <TanaTheme>
        <TanaGridView value={rows} />
      </TanaTheme>
    </div>
  );
};

export const TanaGridView = (gridProps: { value: TanaDataModel[] }) => {
  type DataModel = TanaDataModel;
  const context = defineGridContext<DataModel>({
    label: "root",
    rows: gridProps.value,
    columns: [
      {
        label: "node",
        width: "minmax(180px, min-content)",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          const title = row.title;
          const description = row.description;
          const type = row.type;
          const tags = row.tags ?? [];
          const items = row.items;
          const isFolded = row.isFolded ?? false;
          const hasTags = tags.length > 0;
          const hasTitle = title.trim() !== "";
          return (
            <TanaNodeList>
              <TanaNode>
                <div className="flex items-center h-(--text-line-height)">
                  {type === "node" && (
                    <TanaBullet
                      variant="point"
                      color={!hasTitle ? "gray" : hasTags ? "cyan" : undefined}
                      hasOutline={isFolded}
                    />
                  )}
                  {type === "field:node" && (
                    <TanaBullet variant="field" color={true ? "cyan" : undefined}>
                      <TanaBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                    </TanaBullet>
                  )}
                  {type === "field:email" && (
                    <TanaBullet variant="field" color={true ? "cyan" : undefined}>
                      <TanaBulletIcon iconSlot={iconAt} />
                    </TanaBullet>
                  )}
                  {type === "field:tag" && (
                    <TanaBullet variant="field">
                      <TanaBulletIcon iconSlot={iconHash} />
                    </TanaBullet>
                  )}
                  {type === "field:bool" && (
                    <TanaBullet variant="field">
                      <TanaBulletIcon iconSlot={iconCheck} />
                    </TanaBullet>
                  )}
                  {type === "field:code" && (
                    <TanaBullet variant="field">
                      <TanaBulletIcon iconSlot={iconCode} />
                    </TanaBullet>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-nowrap">{title}</span>
                  {description && (
                    <span className="text-nowrap text-[14px]/[20px] text-zinc-500">
                      {description}
                    </span>
                  )}
                </div>
                {tags?.map((tag) => (
                  <div key={tag} className="flex items-center h-(--text-line-height)">
                    <TanaBullet
                      variant="action"
                      textSlot={tag}
                      hasOutline
                      color={hasTags ? "cyan" : undefined}
                    >
                      <TanaBulletIcon iconSlot={iconHash} />
                    </TanaBullet>
                  </div>
                ))}
              </TanaNode>
              {type === "node" && items && (
                <TanaNodeItems>
                  <TanaGridView value={items} />
                </TanaNodeItems>
              )}
            </TanaNodeList>
          );
        },
      },
      {
        label: "items",
        width: "1fr",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          const type = row.type;
          const items = row.items;
          return (
            <div>
              {type !== "node" && items && (
                <div className={classNames(type === "field:code" && "font-mono")}>
                  <TanaGridView value={items} />
                </div>
              )}
            </div>
          );
        },
      },
    ],
    elements: {
      Grid(props) {
        return <BaseGrid {...props} />;
      },
      Row(props) {
        return <TanaRow {...props} />;
      },
      Cell(props) {
        return (
          <TanaCellContext value={{ cellProps: props as BaseCellProps }}>
            <BaseCell
              {...props}
              className={classNames("relative grid cursor-auto text-nowrap")}
              style={props.style}
            >
              <TanaCellRenderer />
            </BaseCell>
          </TanaCellContext>
        );
      },
    },
  });

  return (
    <div className="w-fit">
      <BaseGridView context={context as GridContextProps} />
    </div>
  );
};

export const TanaTheme = (props: { children?: React.ReactNode }) => {
  const style = {
    "--text-font-size": "15px",
    "--text-line-height": "21px",
    "--bullet-size": "17px",
    "--bullet-field-size": "12px",
    "--bullet-icon-size": "12px",
    "--bullet-point-size": "7px",
  } as CSSProperties;
  const colors = {
    "--color-zinc-750": "color-mix(in oklch, var(--color-zinc-700), var(--color-zinc-800))",
  } as CSSProperties;

  return (
    <div
      className="font-sans text-(size:--text-font-size)/(--text-line-height)"
      style={{ ...style, ...colors }}
    >
      {props.children}
    </div>
  );
};

export const TanaRow = (props: BaseRowProps) => {
  return (
    <BaseRow
      {...props}
      className={classNames("grid grid-cols-subgrid grid-flow-col col-span-full")}
    />
  );
};

export const TanaNodeList = (props: { children?: React.ReactNode }) => {
  return <div className="flex flex-col">{props.children}</div>;
};

export const TanaNode = (props: { children?: React.ReactNode }) => {
  return <div className="flex items-start gap-2 py-[3px]">{props.children}</div>;
};

export const TanaNodeItems = (props: { children?: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col gap-1.5 pl-[calc(var(--bullet-size)*2)]">
      <div className="absolute left-0 top-0 bottom-0 w-(--bullet-size) h-full flex justify-center">
        <button className="w-[1px] h-full rounded-[4px] bg-(--color-zinc-750)"></button>
      </div>
      {props.children}
    </div>
  );
};

export const TanaNodeField = (props: { children?: React.ReactNode }) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-[repeat(10,minmax(140px,max-content))] grid-flow-col items-start",
        "gap-4 pt-1 pb-1.5 border-b border-(--color-zinc-750)",
      )}
    >
      {props.children}
    </div>
  );
};

export const TanaBulletIcon = (props: { iconSlot?: React.ReactNode; style?: CSSProperties }) => {
  return (
    <span
      className="flex size-(--bullet-icon-size) items-center justify-center"
      style={props.style}
    >
      {props.iconSlot}
    </span>
  );
};
