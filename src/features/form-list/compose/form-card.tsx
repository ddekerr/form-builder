import type { ApiSchema } from '@/shared/api/schema';
import { Button } from '@/shared/ui/kit/button';
import { Switch } from '@/shared/ui/kit/switch';

import { useActiveForm } from '../model/use-active-form';
import { useDeleteForm } from '../model/use-delete-form';
import { usePublishForm } from '../model/use-publish-form';
import { FormListCard } from '../ui/forms-list-cards';

export function FormCard({ form }: { form: ApiSchema['Form'] }) {
  const activeForm = useActiveForm();
  const publicForm = usePublishForm();
  const deleteForm = useDeleteForm();

  return (
    <FormListCard
      form={form}
      publicSwitch={
        <>
          <Switch
            disabled={publicForm.getIsPending(form.id)}
            className="cursor-pointer mr-6"
            checked={form.isPublic}
            onCheckedChange={() => publicForm.action(form.id)}
          />
          <span>{form.isPublic ? 'Опублікована' : 'Неопубліковна'}</span>
        </>
      }
      activeSwitch={
        <>
          <Switch
            disabled={activeForm.getIsPending(form.id)}
            className="cursor-pointer mr-6"
            checked={form.isActive}
            onCheckedChange={() => activeForm.action(form.id)}
          />
          <span>{form.isActive ? 'Активна' : 'Неактивна'}</span>
        </>
      }
      bottomActions={
        <>
          <Button variant="outline" size="sm" className="cursor-pointer">
            Редагувати
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="cursor-pointer"
            disabled={deleteForm.getIsPending(form.id)}
            onClick={() => deleteForm.delete(form.id)}
          >
            Видалити
          </Button>
        </>
      }
    />
  );
}
