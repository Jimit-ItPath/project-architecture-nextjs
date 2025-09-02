import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { makeQueryClient } from '../../../lib/queryClient';
import Dashboard from './Dashboard';
import { queries } from '../../../lib/queries';

async function DashboardPage() {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: queries.fetchProductsData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}

export default DashboardPage;
