import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWeekStart, formatWeekLabel } from "@/lib/week";
import EnergyCheckin from "@/components/EnergyCheckin";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
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

  if (!myProfile?.full_name) redirect("/onboarding");

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
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/bg-dashboard.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-space-950/90 via-space-950/95 to-space-950" />

      <div className="relative z-10 mx-auto max-w-md px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <Image src="/logo-white.png" alt="Star Network" width={140} height={42} priority />
          <LogoutButton />
        </header>

        <p className="mb-4 text-sm text-white/60">
          Szia <span className="font-semibold text-white">{myProfile.full_name.split(" ")[0]}</span>! 👋
        </p>

        <EnergyCheckin
          userId={user.id}
          weekStart={weekStart}
          weekLabel={weekLabel}
          initialCheckins={initialCheckins}
          profilesMap={profilesMap}
          totalTeamSize={(allProfiles ?? []).length || 1}
        />
      </div>
    </main>
  );
}
