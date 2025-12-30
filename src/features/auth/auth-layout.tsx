import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui/kit/card';
import type React from 'react';

export function AuthLayout({
  form,
  title,
  description,
  footer,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center container mx-auto px-4 h-dvh">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">{footer}</p>
        </CardFooter>
      </Card>
    </main>
  );
}
