import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { ListIcon, SquareIcon } from 'lucide-react';

export type ViewMode = 'list' | 'cards';

export function ViewModeToggle({ value, onChange }: { value: ViewMode; onChange: (value: ViewMode) => void }) {
  console.log(value);
  return (
    <Tabs defaultValue={value} onValueChange={(e) => onChange(e as ViewMode)}>
      <TabsList>
        <TabsTrigger className="cursor-pointer" value="list">
          <ListIcon />
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="cards">
          <SquareIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
