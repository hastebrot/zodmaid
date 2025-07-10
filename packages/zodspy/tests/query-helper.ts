import { getByRole, type ByRoleMatcher, type ByRoleOptions } from "@testing-library/react";

export const queryHelper = {
  grid(container: HTMLElement) {
    return {
      getGrid(label: string) {
        return getByRole(container, "grid", {
          name: label,
        });
      },

      getRow(rowIndex: number) {
        return getByRole(container, "row", {
          name: `row[${rowIndex}]`,
        });
      },

      getCell(rowIndex: number, columnIndex: number) {
        return getByRole(container, "gridcell", {
          name: `cell[${rowIndex}][${columnIndex}]`,
        });
      },

      getCellExt(
        rowIndex: number,
        columnIndex: number,
        role: ByRoleMatcher,
        options?: ByRoleOptions,
      ) {
        const cell = this.getCell(rowIndex, columnIndex);
        return getByRole(cell, role, options);
      },
    };
  },
};
