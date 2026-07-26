"use client";

import SocialIcon from "@/components/SocialIcon";

export default function SocialLinkCard({
  name,
  href,
  color,
}: {
  name: string;
  href: string;
  color: string;
}) {
  function handleClick(e: React.MouseEvent) {
    // Néhány platformon (pl. telepített PWA-ban, Androidon a TikTok app-link
    // miatt) egy sima <a href> tap "elnyelődik" és nem történik semmi.
    // A window.open-nel indított, script által kezdeményezett navigáció
    // megbízhatóbban megnyílik a rendszer böngészőjében.
    e.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-space-900/80 p-4 backdrop-blur transition active:scale-[0.98]"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: color }}
      >
        <SocialIcon name={name} />
      </span>
      <span className="text-base font-medium text-white">{name}</span>
      <span className="ml-auto text-white/30">→</span>
    </a>
  );
}
