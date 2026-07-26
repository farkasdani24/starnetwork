"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    href: "/",
    label: "Kezdőlap",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M3 10.5 12 3l9 7.5"
          stroke={active ? "#5B85C9" : "currentColor"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 9.5V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9.5"
          stroke={active ? "#5B85C9" : "currentColor"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/hi",
    label: "Hétindító",
    icon: (active: boolean) => (
      <span
        className="text-[13px] font-extrabold tracking-tight"
        style={{ color: active ? "#5B85C9" : "currentColor" }}
      >
        HI
      </span>
    ),
  },
  {
    href: "/social",
    label: "Social",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="6" cy="12" r="2.4" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.8" />
        <circle cx="18" cy="6" r="2.4" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.8" />
        <circle cx="18" cy="18" r="2.4" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.8" />
        <path d="M8.1 10.8 15.9 7.2M8.1 13.2l7.8 3.6" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/kollegak",
    label: "Kollégák",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="9" cy="8" r="2.6" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.8" />
        <path d="M3.5 19c0-2.8 2.5-4.5 5.5-4.5s5.5 1.7 5.5 4.5" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16.5" cy="8.5" r="2.1" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.6" />
        <path d="M15 14.3c2.6.2 4.5 1.8 4.5 4.2" stroke={active ? "#5B85C9" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-space-950/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-white/50 transition ${
                active ? "text-white" : ""
              }`}
            >
              {tab.icon(active)}
              <span className={`text-[11px] ${active ? "font-semibold text-white" : ""}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
