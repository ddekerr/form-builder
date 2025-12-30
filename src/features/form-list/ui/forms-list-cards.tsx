import type { ApiSchema } from '@/shared/api/schema';
import { CardItem, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui/kit/card';
import type React from 'react';

export function FormListCard({
  form,
  activeSwitch,
  publicSwitch,
  bottomActions,
}: {
  form: ApiSchema['Form'];
  bottomActions?: React.ReactNode;
  activeSwitch: React.ReactNode;
  publicSwitch: React.ReactNode;
}) {
  return (
    <CardItem className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">{form.title}</CardTitle>
        {form.description && <CardDescription>{form.description}</CardDescription>}
      </CardHeader>
      <CardContent className="grow">
        <div className="flex justify-start">{activeSwitch}</div>
        <div className="flex justify-start">{publicSwitch}</div>
      </CardContent>

      {bottomActions && <CardFooter className="flex items-center justify-between gap-6">{bottomActions}</CardFooter>}
    </CardItem>
  );
}
