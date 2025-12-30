import { Outlet, useLocation } from 'react-router';
import { ROUTES } from '@/shared/model/routes.ts';
import { Providers } from './providers';
import { AppSidebar } from '@/features/sidebar';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

  return (
    <Providers>
      {!isAuthPage && <AppSidebar />}
      <div className="flex flex-col grow max-w-dvw">
        <Outlet />
      </div>
    </Providers>
  );
}

export default App;
