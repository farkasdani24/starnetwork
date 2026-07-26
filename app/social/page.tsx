import AppShell from "@/components/AppShell";
import { socialLinks } from "@/lib/social";
import SocialLinkCard from "@/components/SocialLinkCard";

export default function SocialPage() {
  return (
    <AppShell>
      <h1 className="mb-1 text-lg font-semibold text-white">Social felületeink</h1>
      <p className="mb-6 text-sm text-white/50">
        Kövessétek és osszátok bátran a Star Network tartalmait!
      </p>

      <div className="space-y-3">
        {socialLinks.map((s) => (
          <SocialLinkCard key={s.name} name={s.name} href={s.href} color={s.color} />
        ))}
      </div>
    </AppShell>
  );
}
