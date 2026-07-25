"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingForm({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, full_name: fullName.trim() });
    setLoading(false);
    if (error) {
      setError("Nem sikerült menteni a nevet. Próbáld újra.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-space-900/80 p-6 shadow-glow backdrop-blur"
    >
      <div>
        <h1 className="text-lg font-semibold text-white">Szia! 👋</h1>
        <p className="mt-1 text-sm text-white/50">
          Mielőtt belevágnánk, hogy hívjunk a csapat előtt?
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-white/70">Teljes név</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-space-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-blueLight"
          placeholder="Kovács Anna"
        />
      </div>

      {error && <p className="text-sm text-brand-orange">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueLight disabled:opacity-60"
      >
        {loading ? "Mentés..." : "Tovább a csapathoz"}
      </button>
    </form>
  );
}
