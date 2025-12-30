import { ROUTES } from '@/shared/model/routes';
import { Link } from 'react-router';
import { AuthLayout } from './auth-layout';
import { RegisterForm } from './register-form';

function RegisterPage() {
  return (
    <AuthLayout
      title="Реєстрація"
      description="Введіть ваші email та пароль для реєстрації в системі"
      form={<RegisterForm />}
      footer={
        <>
          Вже маєте аккаунт? <Link to={ROUTES.LOGIN}>Увійти</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
