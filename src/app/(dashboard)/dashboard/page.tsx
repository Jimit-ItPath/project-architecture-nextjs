import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { makeQueryClient } from '../../../lib/queryClient';
import Dashboard from './Dashboard';
import { queries } from '../../../lib/queries';
import { queryKeys } from '../../../lib/queryKeys';

type ProductsPage = {
  items: any[];
  nextPage: number;
  hasMore: boolean;
  totalPages: number;
  totalProducts: number;
  perPage: number;
};

async function DashboardPage() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.dashboard,
    queryFn: queries.fetchProductsData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: ProductsPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}

export default DashboardPage;
