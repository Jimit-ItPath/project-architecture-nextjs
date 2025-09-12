'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  ProductPayload,
  updateProduct,
} from '../../api/services/products';
import { queryKeys } from '../../../lib/queryKeys';

function addItem(cache: any, newItem: any) {
  if (!cache) return cache;

  if (cache.pages) {
    const updated = {
      ...cache,
      pages: cache.pages.map((pg: any, idx: number) =>
        idx === 0 ? { ...pg, items: [newItem, ...(pg.items || [])] } : pg
      ),
    };
    return updated;
  }
  return [newItem, ...(cache || [])];
}

export function useAddProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductPayload) => createProduct(payload),
    onMutate: async newProduct => {
      await qc.cancelQueries({ queryKey: queryKeys.dashboard });

      const previous = qc.getQueryData(queryKeys.dashboard);
      // optimistic update (prepend to first page)
      qc.setQueryData(queryKeys.dashboard, (old: any) =>
        addItem(old, newProduct)
      );

      return { previous };
    },
    onError: (_err, _new, context) => {
      if (context?.previous) {
        qc.setQueryData(queryKeys.dashboard, context.previous);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useEditProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number | string;
      payload: Partial<ProductPayload>;
    }) => updateProduct(id, payload),
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: queryKeys.dashboard });
      const previous = qc.getQueryData(queryKeys.dashboard);

      // optimistic update: find and replace in pages
      qc.setQueryData(queryKeys.dashboard, (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((pg: any) => ({
            ...pg,
            items: pg.items.map((it: any) =>
              it._id === id ? { ...it, ...payload } : it
            ),
          })),
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        qc.setQueryData(queryKeys.dashboard, context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.dashboard }),
  });
}

export function useDeleteProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteProduct(id),
    onMutate: async id => {
      await qc.cancelQueries({ queryKey: queryKeys.dashboard });
      const previous = qc.getQueryData(queryKeys.dashboard);

      // optimistic update: remove item from pages
      qc.setQueryData(queryKeys.dashboard, (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((pg: any) => ({
            ...pg,
            items: pg.items.filter((it: any) => it._id !== id),
          })),
        };
      });

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous)
        qc.setQueryData(queryKeys.dashboard, context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.dashboard }),
  });
}
