import { rqClient } from '@/shared/api/instance';
import { queryClient } from '@/shared/api/query-client';

export function usePublishForm() {
  const publishFormMutation = rqClient.useMutation('patch', '/forms/{formId}/public', {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/forms'));
    },
  });

  return {
    action: (formId: string) => publishFormMutation.mutate({ params: { path: { formId } } }),
    getIsPending: (formId: string) =>
      publishFormMutation.isPending && publishFormMutation.variables.params.path.formId === formId,
  };
}
