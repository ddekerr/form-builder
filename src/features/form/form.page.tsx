import { useParams } from 'react-router';
import type { PathParams } from '@/shared/model/routes.ts';
import { ROUTES } from '@/shared/model/routes.ts';

function Form() {
  const params = useParams<PathParams[typeof ROUTES.FORM]>();

  return <div>Form {params.formId}</div>;
}

export const Component = Form;
