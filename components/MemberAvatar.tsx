"use client";

import { useState } from "react";
import { initials, avatarColor } from "@/lib/team";

export default function MemberAvatar({ name, photoUrl }: { name: string; photoUrl?: string }) {
  const [failed, setFailed] = useState(false);

  if (photoUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{ backgroundColor: avatarColor(name) }}
    >
      {initials(name)}
    </div>
  );
}
