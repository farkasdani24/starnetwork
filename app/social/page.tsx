import AppShell from "@/components/AppShell";
import { socialLinks } from "@/lib/social";
import SocialIcon from "@/components/SocialIcon";

export default function SocialPage() {
  return (
    <AppShell>
      <h1 className="mb-1 text-lg font-semibold text-white">Social felületeink</h1>
      <p className="mb-6 text-sm text-white/50">
        Kövessétek és osszátok bátran a Star Network tartalmait!
      </p>

      <div className="space-y-3">
        {socialLinks.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-space-900/80 p-4 backdrop-blur transition active:scale-[0.98]"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: s.color }}
            >
              <SocialIcon name={s.name} />
            </span>
            <span className="text-base font-medium text-white">{s.name}</span>
            <span className="ml-auto text-white/30">→</span>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
