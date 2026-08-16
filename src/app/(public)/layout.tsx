export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-sand-50 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 pb-24 md:pb-0">
      {children}
    </div>
  );
}
