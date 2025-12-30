import { ROUTES } from '@/shared/model/routes';
import { Link } from 'react-router';
import { AuthLayout } from './auth-layout';
import { LoginForm } from './login-form';

function LoginPage() {
  return (
    <AuthLayout
      title="Вхід в систему"
      description="Введіть ваші email та пароль для входу в систему"
      form={<LoginForm />}
      footer={
        <>
          Ще немає аккаунту? <Link to={ROUTES.REGISTER}>Зареєструватися</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
