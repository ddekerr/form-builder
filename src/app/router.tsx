import { createBrowserRouter, redirect } from 'react-router';
import { ROUTES } from '@/shared/model/routes.ts';
import App from '@/app/app';
import { protectedLoader, ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        loader: protectedLoader,
        Component: ProtectedRoute,
        children: [
          {
            path: ROUTES.FORMS,
            lazy: () => import('@/features/form-list/form-list.page'),
          },
          {
            path: ROUTES.FORM,
            lazy: () => import('@/features/form/form.page'),
          },
          {
            path: ROUTES.BUILDER,
            lazy: () => import('@/features/form-builder/form-builder.page'),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.FORMS),
      },
    ],
  },
]);
