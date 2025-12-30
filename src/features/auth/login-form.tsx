import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/kit/input';
import { Button } from '@/shared/ui/kit/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from './useLogin';

const loginSchema = z.object({
  email: z.string({ error: "Email обов'язковий" }).email('Невалідний email'),
  password: z.string({ error: "Пароль обов'язковий" }).min(6, 'Пароль має бути довжиною хоча 6 символів'),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { loginData, isPending, error } = useLogin();

  const onSubmit = form.handleSubmit(loginData);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button disabled={isPending} type="submit">
          Увійти
        </Button>
      </form>
    </Form>
  );
}
