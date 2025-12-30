import { Label } from '@/shared/ui/kit/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select';
import { type SortOption } from '../model/use-form-filters';

export function FormSortField({
  value,
  onValueChange,
}: {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
}) {
  return (
    <>
      <Label htmlFor="search">Сортування</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="sort">
          <SelectValue placeholder="Сортування"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">По даті створення</SelectItem>
          <SelectItem value="updatedAt">По даті оновлення</SelectItem>
          <SelectItem value="title">По заголовку</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
