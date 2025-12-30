import { Skeleton } from '@/shared/ui/kit/skeleton';
import type { ViewMode } from './view-mode-toggle';
import type { RefCallback } from 'react';

export function FormsListLayout({
  filters,
  header,
  children,
}: {
  filters: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {header}
      <main className="px-4">
        {filters}
        {children}
      </main>
    </>
  );
}

export function FormsListLayoutFilter({
  search,
  filters,
  sort,
  actions,
}: {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  sort?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-4 min-[500px]:gap-2 min-[500px]:justify-between mb-4">
      {search && <div className="flex items-center gap-2 justify-center w-full">{search}</div>}
      {filters && <div className="flex items-center gap-2 sm:gap-4 justify-center max-[400px]:w-full">{filters}</div>}
      {sort && <div className="flex items-center gap-2 justify-center max-[400px]:w-full">{sort}</div>}
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
}

export function FormsListLayoutContent({
  isEmpty,
  isPending,
  isPendingNext,
  cursorRef,
  hasCursor,
  mode,
  renderItems,
  renderCards,
  isMobile,
}: {
  children?: React.ReactNode;
  isEmpty?: boolean;
  isPending?: boolean;
  isPendingNext?: boolean;
  cursorRef?: RefCallback<HTMLDivElement>;
  hasCursor?: boolean;
  mode: ViewMode;
  renderItems?: () => React.ReactNode;
  renderCards?: () => React.ReactNode;
  isMobile?: boolean;
}) {
  return (
    <div>
      {isPending && <div className="text-center py-10">Звантаження даних...</div>}

      {mode === 'cards' && renderCards && (
        <FormsListLayoutCards isMobile={isMobile}>{renderCards?.()}</FormsListLayoutCards>
      )}
      {mode === 'list' && renderItems && (
        <FormsListLayoutItems isMobile={isMobile}>{renderItems?.()}</FormsListLayoutItems>
      )}

      {isEmpty && !isPending && <div className="text-center py-10">Форми не знайдені...</div>}

      {hasCursor && (
        <div ref={cursorRef} className="text-center py-10">
          {isPendingNext &&
            {
              list: (
                <div className="flex flex-col gap-4">
                  <Skeleton className="w-full min-h-3" />
                  <Skeleton className="w-full min-h-3" />
                </div>
              ),
              cards: (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6 gap-6">
                  <Skeleton className="min-h-10 w-full" />
                  <Skeleton className="min-h-10 w-full" />
                  <Skeleton className="min-h-10 w-full" />
                </div>
              ),
            }[mode]}
        </div>
      )}
    </div>
  );
}

export function FormsListLayoutCards({ children, isMobile }: { children: React.ReactNode; isMobile?: boolean }) {
  return <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6 gap-6">{children}</ul>;
}

export function FormsListLayoutItems({ children, isMobile }: { children: React.ReactNode; isMobile?: boolean }) {
  return (
    <ul className="flex flex-col">
      <li className="grid grid-cols-[8fr_3fr_1fr] lg:grid-cols-[5fr_2fr_4fr_1fr] w-full py-3 justify-between items-center border-t-2">
        <div className="font-bold">Заголовок та опис</div>
        <div className="px-2 font-bold">Дата створення</div>
        {!isMobile && <div className="px-2 font-bold"> Ативувати / Опублікувати</div>}
      </li>
      {children}
    </ul>
  );
}
