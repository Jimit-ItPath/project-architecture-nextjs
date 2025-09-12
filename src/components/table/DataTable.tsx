'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Table,
  Pagination,
  TextInput,
  Group,
  ScrollArea,
  Skeleton,
  Center,
  Stack,
  Alert,
  Text,
  Progress,
} from '@mantine/core';
import {
  IconArrowUp,
  IconArrowDown,
  IconArrowsSort,
  IconInfoCircle,
} from '@tabler/icons-react';
// import { useListVirtualizer } from '../../lib/virtualizer';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '../button';

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (updater: PaginationState) => void;
  isLoading?: boolean;
  rowHeight?: number;
  colWidth?: number;
  tableHeight?: number;
  columnWidths?: Record<string, string>;
  isError?: boolean;
  onRetry: () => void;
  errorMessage?: string;
};

export function DataTable<TData>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
  isLoading,
  rowHeight = 56,
  // colWidth = 180,
  tableHeight,
  columnWidths,
  isError,
  onRetry,
  errorMessage,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    manualPagination: true, // server-side pagination
    // manualSorting: false, // can switch to true if backend sorting
    // manualFiltering: false, // can switch to true if backend filtering
    // onPaginationChange,
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newPaginationState = updater(pagination);
        onPaginationChange(newPaginationState);
      } else {
        onPaginationChange(updater);
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const parentRef = React.useRef<HTMLDivElement | null>(null);

  // const rowVirtualizer = useListVirtualizer(
  //   parentRef as React.RefObject<HTMLDivElement>,
  //   table.getRowModel().rows.length,
  //   rowHeight
  // );

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  // const colVirtualizer = useVirtualizer({
  //   horizontal: true,
  //   count: table.getAllLeafColumns().length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => colWidth,
  //   overscan: 2,
  // });

  //   if (isLoading) return <Loader />;
  if (isLoading && data.length === 0) {
    return (
      <ScrollArea h={tableHeight}>
        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Table.Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <Table.Tr key={`skeleton-${i}`}>
                {table.getAllColumns().map(col => (
                  <Table.Td key={col.id}>
                    <Skeleton height={16} radius='sm' />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    );
  }

  if (isError) {
    return (
      <Center h={tableHeight}>
        <Stack align='center' gap='sm'>
          <Alert
            icon={<IconInfoCircle size={18} />}
            title='Error loading data'
            color='red'
            radius='md'
          >
            {errorMessage ?? 'Something went wrong while fetching data.'}
          </Alert>
          {onRetry && (
            <Button onClick={onRetry} variant='light' color='red'>
              Retry
            </Button>
          )}
        </Stack>
      </Center>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <Center h={tableHeight}>
        <Stack align='center' gap='xs'>
          <IconInfoCircle size={36} stroke={1.5} color='gray' />
          <Text size='lg' fw={500} c='dimmed'>
            No data found
          </Text>
          <Text size='sm' c='dimmed'>
            Try adjusting filters or reload to see results.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <ScrollArea h={tableHeight}>
      {/* 🔹 Top Progress Loader */}
      {isLoading && <Progress value={100} animated color='blue' size='xs' />}

      {/* Table Header */}
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        stickyHeader
      >
        <Table.Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.Th
                  key={header.id}
                  style={{
                    ...(columnWidths &&
                      Object.keys(columnWidths)?.length > 0 && {
                        width: columnWidths[header.column.id],
                      }),
                    backgroundColor: 'white',
                    zIndex: 2,
                  }}
                >
                  <Group
                    gap='xs'
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    style={{
                      cursor: header.column.getCanSort()
                        ? 'pointer'
                        : 'default',
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() &&
                      (header.column.getIsSorted() === 'asc' ? (
                        <IconArrowUp size={16} />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <IconArrowDown size={16} />
                      ) : (
                        <IconArrowsSort size={16} />
                      ))}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          ))}

          {/* Filtering Row */}
          <Table.Tr>
            {table.getHeaderGroups()[0]?.headers.map(header => (
              <Table.Th key={header.id} bg='white' style={{ zIndex: 1 }}>
                {header.column.getCanFilter() ? (
                  <TextInput
                    size='xs'
                    placeholder={`Filter ${String(header.column.columnDef.header)}`}
                    value={(header.column.getFilterValue() as string) ?? ''}
                    onChange={e =>
                      header.column.setFilterValue(e.currentTarget.value)
                    }
                  />
                ) : null}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
      </Table>

      {/* Virtualized Body */}
      <div
        ref={parentRef}
        style={{
          height: tableHeight,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <Table striped highlightOnHover withColumnBorders withTableBorder>
          <Table.Tbody
            style={{
              position: 'relative',
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <Table.Tr
                  key={row.id}
                  // style={{
                  //   position: 'absolute',
                  //   top: 0,
                  //   left: 0,
                  //   width: '100%',
                  //   transform: `translateY(${virtualRow.start}px)`,
                  // }}
                >
                  {row.getVisibleCells().map(cell => (
                    <Table.Td
                      key={cell.id}
                      style={{
                        ...(columnWidths &&
                          Object.keys(columnWidths)?.length > 0 && {
                            width: columnWidths[cell.column.id],
                          }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              );
            })}

            {/* Loading Skeleton Rows (for next page load) */}
            {isLoading &&
              data.length > 0 &&
              Array.from({ length: 3 }).map((_, i) => (
                <Table.Tr key={`loading-row-${i}`}>
                  {columns.map((_, idx) => (
                    <Table.Td key={`loading-row-${i}-${idx}`}>
                      <Skeleton height={16} radius='sm' />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        total={pageCount}
        value={pagination.pageIndex + 1}
        onChange={page =>
          onPaginationChange({ ...pagination, pageIndex: page - 1 })
        }
        className='mt-4'
      />
    </ScrollArea>
  );

  // return (
  //   <ScrollArea h={tableHeight}>
  //     {isLoading && <Progress value={100} animated color='blue' size='xs' />}

  //     <Table
  //       striped
  //       highlightOnHover
  //       withTableBorder
  //       withColumnBorders
  //       stickyHeader
  //     >
  //       {/* Table Header */}
  //       <Table.Thead>
  //         {table.getHeaderGroups().map(headerGroup => (
  //           <Table.Tr key={headerGroup.id}>
  //             {headerGroup.headers.map(header => (
  //               <Table.Th
  //                 key={header.id}
  //                 onClick={
  //                   header.column.getCanSort()
  //                     ? header.column.getToggleSortingHandler()
  //                     : undefined
  //                 }
  //                 style={{
  //                   cursor: header.column.getCanSort() ? 'pointer' : 'default',
  //                   ...(columnWidths &&
  //                     Object.keys(columnWidths)?.length > 0 && {
  //                       width: columnWidths[header.column.id],
  //                     }),
  //                   backgroundColor: 'white',
  //                   zIndex: 2,
  //                 }}
  //               >
  //                 <Group gap='xs'>
  //                   {flexRender(
  //                     header.column.columnDef.header,
  //                     header.getContext()
  //                   )}
  //                   {header.column.getCanSort() &&
  //                     (header.column.getIsSorted() === 'asc' ? (
  //                       <IconArrowUp size={16} />
  //                     ) : header.column.getIsSorted() === 'desc' ? (
  //                       <IconArrowDown size={16} />
  //                     ) : (
  //                       <IconArrowsSort size={16} />
  //                     ))}
  //                 </Group>
  //               </Table.Th>
  //             ))}
  //           </Table.Tr>
  //         ))}
  //         {/* Filtering Row */}
  //         <Table.Tr>
  //           {table.getHeaderGroups()[0]?.headers.map(header => (
  //             <Table.Th
  //               key={header.id}
  //               style={{ backgroundColor: 'white', zIndex: 1 }}
  //             >
  //               {header.column.getCanFilter() ? (
  //                 <TextInput
  //                   size='xs'
  //                   placeholder={`Filter ${String(header.column.columnDef.header)}`}
  //                   value={(header.column.getFilterValue() as string) ?? ''}
  //                   onChange={e =>
  //                     header.column.setFilterValue(e.currentTarget.value)
  //                   }
  //                 />
  //               ) : null}
  //             </Table.Th>
  //           ))}
  //         </Table.Tr>
  //       </Table.Thead>

  //       {/* Virtualized Body */}
  //       <Table.Tbody
  //         ref={parentRef as any}
  //         style={{
  //           position: 'relative',
  //           height: `${rowVirtualizer.getTotalSize()}px`,
  //         }}
  //       >
  //         {rowVirtualizer.getVirtualItems()?.length > 0 ? (
  //           rowVirtualizer.getVirtualItems().map(virtualRow => {
  //             const row = table.getRowModel().rows[virtualRow.index];
  //             return (
  //               <Table.Tr key={row.id}>
  //                 {row.getVisibleCells().map(cell => (
  //                   <Table.Td
  //                     key={cell.id}
  //                     style={{
  //                       ...(columnWidths &&
  //                         Object.keys(columnWidths)?.length > 0 && {
  //                           width: columnWidths[cell.column.id],
  //                         }),
  //                     }}
  //                   >
  //                     {flexRender(
  //                       cell.column.columnDef.cell,
  //                       cell.getContext()
  //                     )}
  //                   </Table.Td>
  //                 ))}
  //               </Table.Tr>
  //             );
  //           })
  //         ) : (
  //           // Empty state
  //           <Table.Tr>
  //             <Table.Td colSpan={columns.length}>
  //               <Center py='lg'>
  //                 <Stack align='center' gap='xs'>
  //                   <IconInfoCircle size={32} stroke={1.5} color='gray' />
  //                   <Text fw={500} c='dimmed'>
  //                     No results found
  //                   </Text>
  //                   <Text size='sm' c='dimmed'>
  //                     Try adjusting filters or reload to see results.
  //                   </Text>
  //                 </Stack>
  //               </Center>
  //             </Table.Td>
  //           </Table.Tr>
  //         )}

  //         {/* Loading Skeleton */}
  //         {isLoading &&
  //           data.length > 0 &&
  //           Array.from({ length: 3 }).map((_, i) => (
  //             <Table.Tr key={`loading-row-${i}`}>
  //               {columns.map((_, idx) => (
  //                 <Table.Td key={`loading-row-${i}-${idx}`}>
  //                   <Skeleton height={16} radius='sm' />
  //                 </Table.Td>
  //               ))}
  //             </Table.Tr>
  //           ))}
  //       </Table.Tbody>
  //     </Table>

  //     {/* Pagination */}
  //     <Pagination
  //       total={pageCount}
  //       value={pagination.pageIndex + 1}
  //       onChange={page =>
  //         onPaginationChange({ ...pagination, pageIndex: page - 1 })
  //       }
  //       className='mt-4'
  //     />
  //   </ScrollArea>
  // );
}
