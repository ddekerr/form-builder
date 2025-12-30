import { useSidebar } from '@/shared/ui/kit/sidebar';
import { AppHeader } from '../header';
import { FormBuilderLayout } from './ui/form-builder-layout';
import { Button } from '@/shared/ui/kit/button';

function FormBuilderPage() {
  const { isMobile } = useSidebar();
  return (
    <FormBuilderLayout
      header={
        <AppHeader
          title="Конструктор форми"
          description="Інструмент для створення гнучких кастомних форм"
          isMobile={isMobile}
        />
      }
    >
      Content
      <ul className="absolute top-1/2 right-0 border-2 -translate-y-1/2">
        <li>
          <Button className="rounded-none w-full" variant="ghost">
            Текстове поле
          </Button>
        </li>
      </ul>
    </FormBuilderLayout>
  );
}

export const Component = FormBuilderPage;
