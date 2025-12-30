import { queryClient } from '@/shared/api/query-client';
import { SidebarProvider } from '@/shared/ui/kit/sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>{children}</SidebarProvider>
    </QueryClientProvider>
  );
}
