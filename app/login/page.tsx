"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Hibás e-mail cím vagy jelszó.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/bg-login.webp)" }}
      />
      <div className="absolute inset-0 bg-space-950/80" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Image src="/logo-white.png" alt="Star Network" width={220} height={66} priority />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-space-900/80 p-6 shadow-glow backdrop-blur"
        >
          <div>
            <h1 className="text-lg font-semibold text-white">Bejelentkezés</h1>
            <p className="mt-1 text-sm text-white/50">
              Star Network Hub – csak meghívott kollégáknak.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-space-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-blueLight"
              placeholder="nev@starnetwork.hu"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">Jelszó</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-space-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-blueLight"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-brand-orange">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueLight disabled:opacity-60"
          >
            {loading ? "Belépés..." : "Belépés"}
          </button>

          <p className="text-center text-xs text-white/40">
            Nincs még fiókod? Kérj meghívót a csapatvezetődtől.
          </p>
        </form>
      </div>
    </main>
  );
}
