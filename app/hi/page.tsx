import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWeekStart, formatWeekLabel } from "@/lib/week";
import EnergyCheckin from "@/components/EnergyCheckin";
import AppShell from "@/components/AppShell";

export default async function HiPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const weekStart = getWeekStart();
  const weekLabel = formatWeekLabel(weekStart);

  const { data: allProfiles } = await supabase.from("profiles").select("id, full_name");
  const profilesMap: Record<string, string> = {};
  (allProfiles ?? []).forEach((p) => {
    profilesMap[p.id] = p.full_name;
  });

  const { data: weekCheckins } = await supabase
    .from("checkins")
    .select("user_id, energy_level")
    .eq("week_start", weekStart);

  const initialCheckins = (weekCheckins ?? []).map((c) => ({
    user_id: c.user_id,
    energy_level: c.energy_level,
    full_name: profilesMap[c.user_id] ?? "Kolléga",
  }));

  return (
    <AppShell>
      <p className="mb-4 text-sm text-white/60">
        Szia <span className="font-semibold text-white">{myProfile?.full_name?.split(" ")[0]}</span>! 👋
      </p>
      <EnergyCheckin
        userId={user.id}
        weekStart={weekStart}
        weekLabel={weekLabel}
        initialCheckins={initialCheckins}
        profilesMap={profilesMap}
        totalTeamSize={(allProfiles ?? []).length || 1}
      />
    </AppShell>
  );
}
