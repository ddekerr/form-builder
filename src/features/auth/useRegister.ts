import { publicRqClient } from '@/shared/api/instance';
import type { ApiSchema } from '@/shared/api/schema';
import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { useNavigate } from 'react-router';

export function useRegister() {
  const navigate = useNavigate();

  const session = useSession();

  const registerMutation = publicRqClient.useMutation('post', '/auth/register', {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const register = (data: ApiSchema['RegisterRequest']) => {
    registerMutation.mutate({ body: data });
  };

  const error = registerMutation.isError ? registerMutation.error.message : undefined;

  return { register, error, isPending: registerMutation.isPending };
}
