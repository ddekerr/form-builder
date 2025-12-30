import { cn } from '@/shared/lib/css';
import { SidebarTrigger } from '@/shared/ui/kit/sidebar';

export function AppHeader({
  title,
  description,
  actions,
  isMobile,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  isMobile: boolean;
}) {
  return (
    <header className="bg-background border-b border-border/40 shadow-sm mb-4">
      <div className="container max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between max-[480px]:flex-col max-[480px]:gap-3">
        <div className="flex items-center w-full">
          {isMobile && <SidebarTrigger className="mr-2 cursor-pointer" />}
          <div className={cn('grow', isMobile ? 'text-center' : '')}>
            <h1 className="text-3xl font-semibold grow">{title}</h1>
            <span className="text-gray-500">{description}</span>
          </div>
        </div>
        {actions}
      </div>
    </header>
  );
}
