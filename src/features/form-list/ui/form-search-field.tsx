import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';

export function FormSearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <>
      <Label htmlFor="search">Пошук</Label>
      <Input
        id="search"
        placeholder="Введіть пошуковий запит"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </>
  );
}
