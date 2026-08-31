export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-canvas text-ink font-sans antialiased selection:bg-brutalYellow selection:text-ink pb-24 xl:pb-0 overflow-x-hidden">
      {children}
    </div>
  );
}
