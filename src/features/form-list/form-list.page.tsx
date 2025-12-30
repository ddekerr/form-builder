import { useState } from 'react';
import { useNavigate } from 'react-router';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/kit/button';
import { AppHeader } from '../header';

import { useDebounce } from '@/shared/lib/react';
import { useSidebar } from '@/shared/ui/kit/sidebar';

import { useFormFilters } from './model/use-form-filters';
import { useFormList } from './model/use-form-list';

import { FormsListLayout, FormsListLayoutContent, FormsListLayoutFilter } from './ui/forms-list-layout';
import { FormSearchField } from './ui/form-search-field';
import { FormFilterField } from './ui/form-filter-field';
import { FormSortField } from './ui/form-sort-field';
import { ViewModeToggle, type ViewMode } from './ui/view-mode-toggle';

import { ROUTES } from '@/shared/model/routes';
import { FormItem } from './compose/form-item';
import { FormCard } from './compose/form-card';

function FormListPage() {
  const formsFilters = useFormFilters();

  const formsQuery = useFormList({
    search: useDebounce(formsFilters.search, 300),
    sort: formsFilters.sort,
    filter: formsFilters.getFilterString(),
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  return (
    <FormsListLayout
      header={
        <AppHeader
          title="Список форм"
          description="Список усіх створених форм"
          actions={
            <Button onClick={() => navigate(ROUTES.BUILDER)}>
              <PlusIcon /> Створити форму
            </Button>
          }
          isMobile={isMobile}
        />
      }
      filters={
        <FormsListLayoutFilter
          search={<FormSearchField value={formsFilters.search} onChange={formsFilters.setSearch} />}
          filters={
            <>
              <FormFilterField
                id="active"
                value="isActive"
                checked={formsFilters.isActive}
                onChange={() => formsFilters.setIsActive((prev) => !prev)}
              />
              <FormFilterField
                id="public"
                value="isPublic"
                checked={formsFilters.isPublic}
                onChange={() => formsFilters.setIsPublic((prev) => !prev)}
              />
            </>
          }
          sort={<FormSortField value={formsFilters.sort} onValueChange={formsFilters.setSort} />}
          actions={<ViewModeToggle value={viewMode} onChange={(value) => setViewMode(value)} />}
        />
      }
    >
      <FormsListLayoutContent
        isEmpty={formsQuery.forms?.length === 0}
        isPending={formsQuery.isPending}
        isPendingNext={formsQuery.isFetchingNextPage}
        cursorRef={formsQuery.cursorRef}
        hasCursor={formsQuery.hasNextPage}
        mode={viewMode}
        renderItems={() => formsQuery.forms?.map((form) => <FormItem key={form.id} form={form} />)}
        renderCards={() => formsQuery.forms?.map((form) => <FormCard key={form.id} form={form} />)}
        isMobile={isMobile}
      />
    </FormsListLayout>
  );
}

export const Component = FormListPage;
