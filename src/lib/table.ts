import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const columnHelper = createColumnHelper<any>();

export function makeTableColumns(fields: string[]): ColumnDef<any, any>[] {
  return fields.map(field =>
    columnHelper.accessor(field, {
      header: () => field.toUpperCase(),
      cell: info => info.getValue(),
    })
  );
}
