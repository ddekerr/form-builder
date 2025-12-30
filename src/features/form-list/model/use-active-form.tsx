import { rqClient } from '@/shared/api/instance';
import { queryClient } from '@/shared/api/query-client';

export function useActiveForm() {
  const activeFormMutation = rqClient.useMutation('patch', '/forms/{formId}/active', {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/forms'));
    },
  });

  return {
    action: (formId: string) => activeFormMutation.mutate({ params: { path: { formId } } }),
    getIsPending: (formId: string) =>
      activeFormMutation.isPending && activeFormMutation.variables.params.path.formId === formId,
  };
}
