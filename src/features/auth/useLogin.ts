import { publicRqClient } from '@/shared/api/instance';
import type { ApiSchema } from '@/shared/api/schema';
import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { useNavigate } from 'react-router';

export function useLogin() {
  const navigate = useNavigate();

  const session = useSession();

  const loginMutation = publicRqClient.useMutation('post', '/auth/login', {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const loginData = (data: ApiSchema['LoginRequest']) => {
    loginMutation.mutate({ body: data });
  };

  const error = loginMutation.isError ? loginMutation.error.message : undefined;

  return { loginData, error, isPending: loginMutation.isPending };
}
