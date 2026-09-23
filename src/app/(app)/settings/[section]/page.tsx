import SettingsScreen from "@/components/settings/SettingsScreen";

export default async function SettingsSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <SettingsScreen activeSection={section} />;
}