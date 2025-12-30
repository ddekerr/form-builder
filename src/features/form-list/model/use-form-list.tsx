import { rqClient } from '@/shared/api/instance';
import { useCallback, type RefCallback } from 'react';
import type { SortOption } from './use-form-filters';

type UseFormListParams = {
  limit?: number;
  search?: string;
  filter: string;
  sort?: SortOption;
};

export function useFormList({ limit = 20, search, filter, sort }: UseFormListParams) {
  const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } = rqClient.useInfiniteQuery(
    'get',
    '/forms',
    { params: { query: { page: 1, limit, search, filter, sort } } },
    {
      initialPageParam: 1,
      pageParamName: 'page',
      getNextPageParam: (lastPage, _, lastPageParam) =>
        Number(lastPageParam) < lastPage.totalPages ? Number(lastPageParam) + 1 : null,
    },
  );

  const cursorRef: RefCallback<HTMLDivElement> = useCallback(
    (el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 },
      );

      if (el) {
        observer.observe(el);
        return () => {
          observer.disconnect();
        };
      }
    },
    [fetchNextPage],
  );
  const forms = data?.pages.flatMap((page) => page.list ?? []);

  return { forms, cursorRef, isFetchingNextPage, isPending, hasNextPage };
}
