import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { timeGreeting } from "@/lib/greeting";
import AppShell from "@/components/AppShell";

export default async function HomePage() {
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

  const firstName = profile?.full_name?.split(" ")[0] ?? "";
  const isMonday = new Date().getDay() === 1;

  return (
    <AppShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <Image src="/logo-white.png" alt="Star Network" width={180} height={54} priority className="mb-8" />

        <p className="text-sm uppercase tracking-widest text-white/40">{timeGreeting()}</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Szia, {firstName}! 👋</h1>
        <p className="mt-3 max-w-xs text-sm text-white/60">
          Üdv a Star Network Hub-ban — itt találod a heti hétindítót, a csapat elérhetőségeit és a social felületeinket.
        </p>

        {isMonday && (
          <a
            href="/hi"
            className="mt-8 rounded-xl border border-brand-blueLight/40 bg-brand-blue/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue/30"
          >
            Ma van a hétindító → mehet az energiaszinted? →
          </a>
        )}
      </div>
    </AppShell>
  );
}
