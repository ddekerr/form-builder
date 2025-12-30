import { ROUTES } from '@/shared/model/routes';

export type MenuItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};

export const menuItems: MenuItem[] = [
  {
    title: 'Список форм',
    url: ROUTES.FORMS,
  },
];
