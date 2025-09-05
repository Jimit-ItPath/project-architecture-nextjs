import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 min
        gcTime: 1000 * 60 * 5, // 5 min
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
