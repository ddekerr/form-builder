import { rqClient } from '@/shared/api/instance';
import { queryClient } from '@/shared/api/query-client';

export function useDeleteForm() {
  const deleteFormMutation = rqClient.useMutation('delete', '/forms/{formId}', {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/forms'));
    },
  });

  return {
    delete: (formId: string) => deleteFormMutation.mutate({ params: { path: { formId } } }),
    getIsPending: (formId: string) =>
      deleteFormMutation.isPending && deleteFormMutation.variables.params.path.formId === formId,
  };
}
