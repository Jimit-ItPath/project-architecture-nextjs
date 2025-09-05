export const queryKeys = {
  dashboard: ['dashboard'] as const,
  users: ['users'] as const,
  products: (filters?: Record<string, any>) => ['products', filters] as const,
};
