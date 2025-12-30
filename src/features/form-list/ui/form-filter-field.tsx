import { Checkbox } from '@/shared/ui/kit/checkbox';
import { Label } from '@/shared/ui/kit/label';

interface FormFieldsProps {
  id: 'active' | 'public';
  value: 'isActive' | 'isPublic';
  checked: boolean;
  onChange: () => void;
}

export function FormFilterField({ id, value, checked, onChange }: FormFieldsProps) {
  return (
    <div className="flex gap-2">
      <Label htmlFor="public">Опубліковані</Label>
      <Checkbox id={id} name="filter" value={value} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
