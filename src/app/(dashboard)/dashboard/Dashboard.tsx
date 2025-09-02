'use client';

import { useQuery } from '@tanstack/react-query';
import { queries } from '../../../lib/queries';

const Dashboard = () => {
  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: queries.fetchProductsData,
  });

  return (
    <>
      <div>This is the Dashboard</div>
      <button onClick={() => refetch()}>Click</button>
    </>
  );
};

export default Dashboard;
