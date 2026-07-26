import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import BottomNav from "@/components/BottomNav";

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.full_name) redirect("/onboarding");

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/bg-dashboard.webp)" }}
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-space-950/90 via-space-950/95 to-space-950" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col">
        <header className="flex items-center justify-between px-4 pb-2 pt-6">
          <Image src="/logo-white.png" alt="Star Network" width={132} height={40} priority />
          <LogoutButton />
        </header>

        <main className="flex-1 px-4 pb-24 pt-2">{children}</main>

        <BottomNav />
      </div>
    </div>
  );
}
