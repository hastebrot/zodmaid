import { useEffect, useRef, useState, type Key } from "react";
import { Cell, DataGrid, Row, textEditor, type Column, type DataGridHandle } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { classNames } from "../helpers/clsx";

interface Row {
  index: number;
  businessCase: string;
  objectKey: string;
  amount: number;
  currency: string;
  bookingDate: string;
  paymentDate: string;
  debtorId: string;
  creditorId: string;
  documentId: string;
  parentId: string;
  userId: string;
  sourceSystem: string;
  tariffCode: string;
  agentId: string;
  provisionAmount: number;
  agioAmount: number;
}

const columns: Column<Row>[] = [
  {
    key: "index",
    name: "Index",
    width: "max-content",
  },
  {
    key: "businessCase",
    name: "Business Case",
    renderHeaderCell(props) {
      return <div>{props.column.name}</div>;
    },
    renderCell(props) {
      return (
        <div className="flex gap-1 items-stretch">
          <button
            className="hover:outline cursor-pointer px-0.5 flex items-center"
            type="button"
            onClick={() => {
              console.log("button");
            }}
          >
            <div className="text-blue-500 font-mono text-sm/none">{`""`}</div>
          </button>
          <div className="flex gap-1 items-center">
            <div className="text-green-500 font-mono text-sm/none">{`//`}</div>
            <div className="text-red-500 font-mono text-sm/none">{`<>`}</div>
            <div className="text-red-500 font-mono text-sm/none">{`{}`}</div>
            <div className="text-red-500 font-mono text-sm/none">{`[]`}</div>
            <div className="text-blue-500 font-mono text-sm/none">{`""`}</div>
            <div className="text-blue-500 font-mono text-sm/none">{`#`}</div>
            <div className="text-blue-500 font-mono text-sm/none">{`01`}</div>
            <div className="text-blue-500 font-mono text-sm/none">{`Ø`}</div>
            <div className="text-blue-500 font-mono text-sm/none">{`$`}</div>
            {props.row.businessCase}
          </div>
        </div>
      );
    },
    renderEditCell: textEditor,
    editable: true,
  },
  {
    key: "objectKey",
    name: "Object Key",
  },
  {
    key: "amount",
    name: "Amount",
  },
  {
    key: "currency",
    name: "Currency",
  },
  {
    key: "bookingDate",
    name: "Booking Date",
  },
  {
    key: "paymentDate",
    name: "Payment Date",
  },
  {
    key: "debtorId",
    name: "Debtor ID",
  },
  {
    key: "creditorId",
    name: "Creditor ID",
  },
  {
    key: "documentId",
    name: "Document ID",
  },
  {
    key: "parentId",
    name: "Parent ID",
  },
  {
    key: "userId",
    name: "User ID",
  },
  {
    key: "sourceSystem",
    name: "Source System",
  },
  {
    key: "tariffCode",
    name: "Tariff Code",
  },
  {
    key: "agentId",
    name: "Agent ID",
  },
  {
    key: "provisionAmount",
    name: "Provision Amount",
  },
  {
    key: "agioAmount",
    name: "Agio Amount",
  },
];

const _rows: Row[] = [
  {
    index: 1,
    businessCase: "contract_payment",
    objectKey: "CONTAINER_123456",
    amount: 1250.0,
    currency: "EUR",
    bookingDate: "2025-06-24",
    paymentDate: "2025-06-24",
    debtorId: "CRM_USER_00123",
    creditorId: "ASSET_MGR_00987",
    documentId: "INV_2025_0633",
    parentId: "CHAIN_473928",
    userId: "SYS_FINANCEBOT",
    sourceSystem: "CRM",
    tariffCode: "T-STD-24A",
    agentId: "AGT_333",
    provisionAmount: 50.0,
    agioAmount: 10.0,
  },
];

export const DatagridPage = () => {
  const ref = useRef<DataGridHandle>(null);
  const [rows, setRows] = useState<Row[]>(_rows);
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
    <div className="min-h-dvh bg-[#212121] p-4">
      <DataGrid
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        className="!border-none !bg-[#212121] select-none"
        ref={ref}
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        // headerRowHeight={0}
        defaultColumnOptions={{
          resizable: true,
        }}
        headerRowClass={classNames(
          "[&>div]:border-t [&>div]:border-[#444444] [&>div]:first:border-l",
        )}
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
          if (event.target instanceof HTMLElement && event.target.tagName === "BUTTON") {
            event.preventGridDefault();
          }
          // event.stopPropagation();
        }}
        onCellClick={(props, event) => {
          event.preventGridDefault();
          // console.log("cell click");
          // event.stopPropagation();
          // props.selectCell(true);
        }}
        onCellDoubleClick={(props, event) => {
          event.preventGridDefault();
        }}
      />
    </div>
  );
};
