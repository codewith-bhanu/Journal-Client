export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="settings-shell min-h-full w-full">{children}</div>;
}