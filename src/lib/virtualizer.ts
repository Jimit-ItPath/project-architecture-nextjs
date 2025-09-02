import { useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';

export function useListVirtualizer(
  parentRef: RefObject<HTMLDivElement>,
  itemCount: number,
  itemSize = 56 // default row height,
) {
  return useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize,
    overscan: 5,
  });
}
