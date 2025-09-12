import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // For dashboards/lists we want data to be considered fresh for a while:
        staleTime: 1000 * 60 * 5, // 5 min
        // Keep cached data for longer so background navigations stay instant
        gcTime: 1000 * 60 * 15, // 15 min
        retry: 1,
        refetchOnWindowFocus: true,
        // Prevents aggressive refetching
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}
