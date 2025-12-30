import { useState } from 'react';

export type SortOption = 'createdAt' | 'updatedAt' | 'title';
export type FilterValue = 'isActive' | 'isPublic';

export function useFormFilters() {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<SortOption>('createdAt');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const getFilterString = (): string => {
    const result: string[] = [];
    if (isActive) result.push('isActive');
    if (isPublic) result.push('isPublic');
    return result.join(',');
  };

  return { search, sort, isActive, isPublic, setIsActive, setIsPublic, setSearch, setSort, getFilterString };
}
