import { type TeamMember } from "@/lib/team";
import { phoneHref, phoneDisplay } from "@/lib/phone";
import MemberAvatar from "@/components/MemberAvatar";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const hasContact = member.email1 || member.email2 || member.phone;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-space-900/80 p-3.5 backdrop-blur">
      <MemberAvatar name={member.name} photoUrl={member.photoUrl} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{member.name}</p>
        <p className="truncate text-xs text-white/50">{member.role}</p>

        {hasContact && (
          <div className="mt-1.5 space-y-0.5 text-xs text-white/40">
            {member.email1 && (
              <p className="truncate">
                <a href={`mailto:${member.email1}`} className="hover:text-white/70">{member.email1}</a>
              </p>
            )}
            {member.email2 && (
              <p className="truncate">
                <a href={`mailto:${member.email2}`} className="hover:text-white/70">{member.email2}</a>
              </p>
            )}
            {member.phone && (
              <p className="truncate">
                <a href={phoneHref(member.phone)} className="hover:text-white/70">
                  {phoneDisplay(member.phone)}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
