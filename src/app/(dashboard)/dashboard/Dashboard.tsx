'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { queries } from '../../../lib/queries';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useRef } from 'react';
import { DataTable } from '../../../components/table/DataTable';
import { queryKeys } from '../../../lib/queryKeys';

type Product = {
  _id: number;
  title: string;
  price: number;
  type?: string;
  category?: string;
  brand?: string;
};

const Dashboard = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKeys.dashboard,
    queryFn: queries.fetchProductsData,
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  // Flatten pages into a single array
  const products: Product[] = data?.pages.flatMap(page => page.items) ?? [];

  // Define dynamic columns
  const columns: ColumnDef<Product>[] = [
    {
      header: 'ID',
      accessorKey: '_id',
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Brand',
      accessorFn: row => row.brand ?? 'N/A',
    },
    {
      header: 'Type',
      accessorFn: row => row.type ?? 'N/A',
    },
    {
      header: 'Category',
      accessorFn: row => row.category ?? 'N/A',
    },
  ];

  const columnWidths = {
    _id: '100px',
    title: '200px',
    price: '80px',
    brand: '120px',
    type: '120px',
    category: '150px',
  };

  // Intersection Observer for infinite scroll
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div style={{ color: 'red' }}>
        Failed to load products: {(error as Error).message}
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>

      <DataTable
        columns={columns}
        data={products}
        pageCount={-1}
        pagination={{ pageIndex: 0, pageSize: products.length }}
        onPaginationChange={() => {}}
        rowHeight={56}
        columnWidths={columnWidths}
        isLoading={isLoading || isFetchingNextPage}
        isError={isError}
        onRetry={() => refetch()}
      />

      {/* Infinite scroll trigger */}
      <div ref={loaderRef} style={{ height: '1px' }} />

      {/* {isFetchingNextPage && <p>Loading more...</p>} */}
    </div>
  );
};

export default Dashboard;
