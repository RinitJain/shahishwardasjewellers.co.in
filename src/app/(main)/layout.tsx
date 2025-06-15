// The main Header and Footer are now conditionally rendered by RootLayout.
// This layout can be kept for (main) group specific logic if any,
// or simplified if its only purpose was adding Header/Footer.

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
