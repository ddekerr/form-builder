import type { ApiSchema } from '@/shared/api/schema';
import { Button } from '@/shared/ui/kit/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/kit/dropdown-menu';
import { MoreVerticalIcon } from 'lucide-react';

export function FormsListItems({
  form,
  activeSwitch,
  publicSwitch,
  dropDownActions,
  isMobiile,
}: {
  form: ApiSchema['Form'];
  dropDownActions?: React.ReactNode;
  activeSwitch: React.ReactNode;
  publicSwitch: React.ReactNode;
  isMobiile?: boolean;
}) {
  return (
    <li className="grid grid-cols-[8fr_3fr_1fr] lg:grid-cols-[5fr_2fr_4fr_1fr] w-full py-3 justify-between items-center border-t-2 hover:bg-gray-200">
      <div>
        <h2 className="mb-1">{form.title}</h2>
        <p className="text-sm text-gray-500">{form.description}</p>
      </div>
      <p className="px-2">{new Date(form.createdAt).toLocaleDateString('uk-UA')}</p>
      {!isMobiile && (
        <div className="px-2 flex flex-col gap-2">
          <div className="flex justify-start gap-3 items-center">{activeSwitch}</div>
          <div className="flex justify-start gap-3 items-center">{publicSwitch}</div>
        </div>
      )}
      <div className="">
        {dropDownActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="cursor-pointer float-end">
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{dropDownActions}</DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </li>
  );
}
