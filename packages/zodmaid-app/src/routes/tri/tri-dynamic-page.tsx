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
import { TriBulletButton } from "zodspy/components/tri/tri-bullet-button";
import { TriCellContext } from "zodspy/components/tri/tri-cell-context";
import { TriCellRenderer } from "zodspy/components/tri/tri-cell-renderer";
import {
  iconAt,
  iconCheck,
  iconCode,
  iconCursorText,
  iconHash,
} from "zodspy/components/tri/tri-icons";
import { musicLibrary } from "zodspy/examples/music-library";
import { MusicLibrarySchema } from "zodspy/examples/music-library-schema";
import { classNames } from "../../helpers/clsx";
import { useDocumentTitle } from "../../helpers/react";

// TODO: fold and unfold nodes.
// TODO: toolbar with toggle overlay, floating toolbar overlay
// TODO: state management with owner/key.

export type TriDataModel = {
  title: string;
  description?: string;
  type: string;
  tags?: string[];
  items: TriDataModel[];
  isFolded?: boolean;
  useFieldView?: boolean;
  useTableView?: boolean;
};

export const TriDynamicPage = () => {
  useDocumentTitle("tri: grid view dynamic");
  useEffect(() => {
    const data = MusicLibrarySchema.parse(musicLibrary);
    const schema = z.toJSONSchema(MusicLibrarySchema);
    console.log(data, schema);
  }, []);
  const rows: TriDataModel[] = [
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
              title: "",
              type: "node",
              items: [],
            },
            {
              title: "Pattern",
              type: "field:code",
              items: [{ title: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$", type: "node", items: [] }],
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
              title: "",
              type: "node",
              items: [],
            },
            {
              title: "Pattern",
              type: "field:code",
              items: [{ title: "^[0-9]{2}:[0-9]{2}$", type: "node", items: [] }],
            },
          ],
        },
        {
          title: "Writer",
          type: "field:node",
          items: [
            {
              title: "",
              type: "node",
              items: [],
            },
            {
              title: "Optional",
              type: "field:bool",
              items: [{ title: "True", type: "node", items: [] }],
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
      <TriTheme>
        <TriGridView value={rows} />
      </TriTheme>
    </div>
  );
};

export const TriGridView = (gridProps: { value: TriDataModel[] }) => {
  type DataModel = TriDataModel;
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
            <TriNodeList>
              <TriNode>
                <div className="flex items-center h-(--text-line-height)">
                  {type === "node" && (
                    <TriBulletButton
                      variant="point"
                      color={!hasTitle ? "gray" : hasTags ? "cyan" : undefined}
                      hasOutline={isFolded}
                    />
                  )}
                  {type === "field:node" && (
                    <TriBulletButton variant="field" color={true ? "cyan" : undefined}>
                      <TriBulletIcon iconSlot={iconCursorText} style={{ marginLeft: "-3px" }} />
                    </TriBulletButton>
                  )}
                  {type === "field:email" && (
                    <TriBulletButton variant="field" color={true ? "cyan" : undefined}>
                      <TriBulletIcon iconSlot={iconAt} />
                    </TriBulletButton>
                  )}
                  {type === "field:tag" && (
                    <TriBulletButton variant="field" color={true ? "cyan" : undefined}>
                      <TriBulletIcon iconSlot={iconHash} />
                    </TriBulletButton>
                  )}
                  {type === "field:bool" && (
                    <TriBulletButton variant="field">
                      <TriBulletIcon iconSlot={iconCheck} />
                    </TriBulletButton>
                  )}
                  {type === "field:code" && (
                    <TriBulletButton variant="field">
                      <TriBulletIcon iconSlot={iconCode} />
                    </TriBulletButton>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={classNames("text-nowrap", !hasTitle && "text-zinc-500")}>
                    {title === "" ? "Empty" : title}
                  </span>
                  {description && (
                    <span className="text-nowrap text-[14px]/[20px] text-zinc-500">
                      {description}
                    </span>
                  )}
                </div>
                {tags?.map((tag) => (
                  <div key={tag} className="flex items-center h-(--text-line-height)">
                    <TriBulletButton
                      variant="action"
                      textSlot={tag}
                      hasOutline
                      color={hasTags ? "cyan" : undefined}
                    >
                      <TriBulletIcon iconSlot={iconHash} />
                    </TriBulletButton>
                  </div>
                ))}
              </TriNode>
              {type === "node" && items.length > 0 && (
                <TriNodeItems>
                  <TriGridView value={items} />
                </TriNodeItems>
              )}
            </TriNodeList>
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
            <div className="w-fit">
              {type !== "node" && items && (
                <div
                  className={classNames(
                    type === "field:code" &&
                      "font-mono [&_span]:bg-zinc-800 [&_span]:text-amber-500 [&_span]:rounded-sm [&_span]:px-1",
                  )}
                >
                  <TriGridView value={items} />
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
        return <TriRow {...props} />;
      },
      Cell(props) {
        return (
          <TriCellContext value={{ cellProps: props as BaseCellProps }}>
            <BaseCell
              {...props}
              className={classNames("relative grid cursor-auto text-nowrap")}
              style={props.style}
            >
              <TriCellRenderer />
            </BaseCell>
          </TriCellContext>
        );
      },
    },
  });

  return (
    <div className="w-min">
      <BaseGridView context={context as GridContextProps} />
    </div>
  );
};

export const TriTheme = (props: { children?: React.ReactNode }) => {
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

export const TriRow = (props: BaseRowProps) => {
  return (
    <BaseRow
      {...props}
      className={classNames("grid grid-cols-subgrid grid-flow-col col-span-full")}
    />
  );
};

export const TriNodeList = (props: { children?: React.ReactNode }) => {
  return <div className={classNames("flex flex-col")}>{props.children}</div>;
};

export const TriNode = (props: { children?: React.ReactNode }) => {
  return (
    <div className="relative flex items-start gap-2 py-[3px]">
      {props.children}
      <div className="absolute inset-0 m-0.5 -mx-0.5 bg-blue-500/20 outline outline-blue-500/50 rounded-md"></div>
    </div>
  );
};

export const TriNodeItems = (props: { children?: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col gap-1.5 pl-[calc(var(--bullet-size)*2)]">
      <div className="absolute left-0 top-0 bottom-0 w-(--bullet-size) h-full flex justify-center">
        <button className="w-[1px] h-full rounded-[4px] bg-(--color-zinc-750)"></button>
      </div>
      {props.children}
    </div>
  );
};

export const TriNodeField = (props: { children?: React.ReactNode }) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-[repeat(10,_minmax(140px,_max-content))] grid-flow-col items-start",
        "gap-4 pt-1 pb-1.5 border-b border-(--color-zinc-750)",
      )}
    >
      {props.children}
    </div>
  );
};

export const TriBulletIcon = (props: { iconSlot?: React.ReactNode; style?: CSSProperties }) => {
  return (
    <span
      className="flex size-(--bullet-icon-size) items-center justify-center"
      style={props.style}
    >
      {props.iconSlot}
    </span>
  );
};
