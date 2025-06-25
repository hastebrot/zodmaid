import "react-data-grid/lib/styles.css";

import { useEffect, useRef, useState, type Key } from "react";
import { Cell, DataGrid, Row, type Column, type DataGridHandle } from "react-data-grid";

interface Row {
  id: number;
  title: string;
}

const columns: Column<Row>[] = [
  {
    key: "id",
    name: "ID",
    width: "max-content",
  },
  {
    key: "title",
    name: "Title",
    renderHeaderCell(props) {
      return <div className="_bg-red-500">{props.column.name}</div>;
    },
    renderCell(props) {
      return <div>{props.row.title}</div>;
    },
    editable: true,
  },
];

const rows: Row[] = [
  { id: 0, title: "Example" },
  { id: 1, title: "Demo" },
];

export const DatagridPage = () => {
  const ref = useRef<DataGridHandle>(null);
  const [selectedRows, setSelectedRows] = useState<Set<Key>>();
  useEffect(() => {
    console.log("selected row change");
    console.log(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    if (ref.current) {
      // ref.current.element?.blur();
      // ref.current.selectCell(
      //   {
      //     idx: -1,
      //     rowIdx: -1,
      //   },
      //   { enableEditor: false },
      // );
    }
  }, [ref]);
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (ref.current) {
      // ref.current.selectCell({ idx: 0, rowIdx: 0 }, { shouldFocusCell: true, enableEditor: false });
    }
  };
  return (
    <div className="min-h-dvh bg-[#212121] p-4" onClick={onClick}>
      <DataGrid
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        className="!border-none !bg-[#212121] select-none"
        ref={ref}
        columns={columns}
        rows={rows}
        // headerRowHeight={0}
        renderers={{
          renderCell(key, props) {
            return <Cell key={key} {...props} className="border-[#444444] first:border-l" />;
          },
          renderRow(key, props) {
            return <Row key={key} {...props} />;
          },
        }}
        onSelectedCellChange={(event) => {
          console.log("selected cell change", event);
        }}
        onCellMouseDown={(props, event) => {
          // event.preventGridDefault();
          // event.stopPropagation();
        }}
        onCellClick={(props, event) => {
          // event.preventGridDefault();
          // console.log("cell click");
          // event.stopPropagation();
          // props.selectCell(true);
        }}
        onCellDoubleClick={(props, event) => {
          // event.preventGridDefault();
        }}
      />
    </div>
  );
};
