export function FormBuilderLayout({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      {header}
      <main>{children}</main>
    </>
  );
}
