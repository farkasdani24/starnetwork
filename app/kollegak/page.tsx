import AppShell from "@/components/AppShell";
import { teamGroups } from "@/lib/team";
import TeamMemberCard from "@/components/TeamMemberCard";

export default function KollegakPage() {
  return (
    <AppShell>
      <h1 className="mb-1 text-lg font-semibold text-white">Kollégák</h1>
      <p className="mb-6 text-sm text-white/50">
        Elérhetőségek sablon állapotban — hamarosan feltöltjük a valós adatokat.
      </p>

      <div className="space-y-7">
        {teamGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-white/40">
              {group.title}
            </h2>
            <div className="space-y-2.5">
              {group.members.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
