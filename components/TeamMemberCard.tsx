import { type TeamMember } from "@/lib/team";
import MemberAvatar from "@/components/MemberAvatar";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-space-900/80 p-3.5 backdrop-blur">
      <MemberAvatar name={member.name} photoUrl={member.photoUrl} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{member.name}</p>
        <p className="truncate text-xs text-white/50">{member.role}</p>

        <div className="mt-1.5 space-y-0.5 text-xs text-white/40">
          <p className="truncate">
            {member.email1 ? (
              <a href={`mailto:${member.email1}`} className="hover:text-white/70">{member.email1}</a>
            ) : (
              "e-mail 1 – hamarosan"
            )}
          </p>
          <p className="truncate">
            {member.email2 ? (
              <a href={`mailto:${member.email2}`} className="hover:text-white/70">{member.email2}</a>
            ) : (
              "e-mail 2 – hamarosan"
            )}
          </p>
          <p className="truncate">
            {member.phone ? (
              <a href={`tel:${member.phone}`} className="hover:text-white/70">{member.phone}</a>
            ) : (
              "telefonszám – hamarosan"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
