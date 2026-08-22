export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink font-sans antialiased">
      {children}
    </div>
  );
}
