import type { ApiSchema } from '@/shared/api/schema';
import { Switch } from '@/shared/ui/kit/switch';
import { useActiveForm } from '../model/use-active-form';
import { useDeleteForm } from '../model/use-delete-form';
import { usePublishForm } from '../model/use-publish-form';
import { FormsListItems } from '../ui/forms-list-items';
import { useIsMobile } from '@/shared/lib/react/use-mobile';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/shared/ui/kit/dropdown-menu';
import { Label } from '@/shared/ui/kit/label';

export function FormItem({ form }: { form: ApiSchema['Form'] }) {
  const activeForm = useActiveForm();
  const publicForm = usePublishForm();
  const deleteForm = useDeleteForm();
  const isMobile = useIsMobile();

  return (
    <FormsListItems
      form={form}
      activeSwitch={
        <>
          <Switch
            id="activate"
            disabled={activeForm.getIsPending(form.id)}
            checked={form.isActive}
            onCheckedChange={() => activeForm.action(form.id)}
          />
          <Label htmlFor="activate">{form.isActive ? 'Активна' : 'Неактивна'}</Label>
        </>
      }
      publicSwitch={
        <>
          <Switch
            id="publish"
            disabled={publicForm.getIsPending(form.id)}
            checked={form.isPublic}
            onCheckedChange={() => publicForm.action(form.id)}
          />
          <Label htmlFor="publish">{form.isPublic ? 'Опублікована' : 'Неопублікована'}</Label>
        </>
      }
      dropDownActions={
        <>
          {isMobile && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  disabled={activeForm.getIsPending(form.id)}
                  onClick={() => activeForm.action(form.id)}
                >
                  {form.isActive ? 'Деактивувати' : 'Активувати'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={publicForm.getIsPending(form.id)}
                  onClick={() => publicForm.action(form.id)}
                >
                  {form.isPublic ? 'Зняти з публікації' : 'Опублікувати'}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            variant="destructive"
            disabled={deleteForm.getIsPending(form.id)}
            onClick={() => deleteForm.delete(form.id)}
          >
            Видалити
          </DropdownMenuItem>
        </>
      }
      isMobiile={isMobile}
    />
  );
}
