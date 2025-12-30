import { useSession } from '@/shared/model/session';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/kit/sidebar';
import { LayoutDashboardIcon, MoreVerticalIcon, User, XIcon } from 'lucide-react';
import { menuItems } from './menu-items';
import { Link, useLocation } from 'react-router';
import { Button } from '@/shared/ui/kit/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu';

export function AppSidebar() {
  const { session, logout } = useSession();
  const { toggleSidebar, isMobile } = useSidebar();
  const location = useLocation();

  if (!session) return null;

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between items-center border-b-2">
        <LayoutDashboardIcon />
        <h1 className="grow text-2xl font-bold">Конструктор форм</h1>
        {isMobile && (
          <Button variant="outline" onClick={() => toggleSidebar()}>
            <XIcon />
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Форми</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((menu) => (
                <SidebarMenuItem key={menu.url}>
                  <SidebarMenuButton asChild className={menu.url === location.pathname ? 'bg-green-100' : ''}>
                    <Link to={menu.url}>{menu.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex-row items-center">
        <User size={24} />
        <p className="text-sm text-gray-500 grow">{session.email}</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <MoreVerticalIcon size={21} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => logout()}>Вийти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
