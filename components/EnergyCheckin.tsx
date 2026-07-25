"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import EnergyBar from "@/components/EnergyBar";

type Checkin = { user_id: string; full_name: string; energy_level: number };

export default function EnergyCheckin({
  userId,
  weekStart,
  weekLabel,
  initialCheckins,
  profilesMap,
  totalTeamSize,
}: {
  userId: string;
  weekStart: string;
  weekLabel: string;
  initialCheckins: Checkin[];
  profilesMap: Record<string, string>;
  totalTeamSize: number;
}) {
  const supabase = createClient();
  const own = initialCheckins.find((c) => c.user_id === userId);

  const [value, setValue] = useState<number>(own?.energy_level ?? 65);
  const [submitted, setSubmitted] = useState<boolean>(Boolean(own));
  const [saving, setSaving] = useState(false);
  const [checkins, setCheckins] = useState<Checkin[]>(initialCheckins);

  useEffect(() => {
    const channel = supabase
      .channel(`checkins-${weekStart}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "checkins",
          filter: `week_start=eq.${weekStart}`,
        },
        (payload) => {
          const row = payload.new as { user_id: string; energy_level: number };
          if (!row?.user_id) return;
          setCheckins((prev) => {
            const name = profilesMap[row.user_id] ?? "Kolléga";
            const others = prev.filter((c) => c.user_id !== row.user_id);
            return [...others, { user_id: row.user_id, full_name: name, energy_level: row.energy_level }];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart]);

  const average = useMemo(() => {
    if (checkins.length === 0) return null;
    const sum = checkins.reduce((acc, c) => acc + c.energy_level, 0);
    return Math.round(sum / checkins.length);
  }, [checkins]);

  const sorted = useMemo(
    () => [...checkins].sort((a, b) => b.energy_level - a.energy_level),
    [checkins]
  );

  async function handleSubmit() {
    setSaving(true);
    const { error } = await supabase
      .from("checkins")
      .upsert(
        { user_id: userId, week_start: weekStart, energy_level: value },
        { onConflict: "user_id,week_start" }
      );
    setSaving(false);
    if (!error) {
      setSubmitted(true);
      setCheckins((prev) => {
        const name = profilesMap[userId] ?? "Én";
        const others = prev.filter((c) => c.user_id !== userId);
        return [...others, { user_id: userId, full_name: name, energy_level: value }];
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-space-900/80 p-6 shadow-glow backdrop-blur">
        <p className="text-xs uppercase tracking-wide text-white/40">{weekLabel} · Hétindító</p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          {submitted ? "A mai energiaszinted:" : "Hogy állsz ma energiaszinten?"}
        </h2>

        <div className="mt-5">
          <div className="mb-2 text-center text-4xl font-bold text-white">{value}%</div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-white/40">
            <span>Kimerült</span>
            <span>Feltöltődve</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-5 w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueLight disabled:opacity-60"
        >
          {saving ? "Küldés..." : submitted ? "Frissítés" : "Beküldöm"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-space-900/80 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/90">Csapat energiaszint</h3>
          <span className="text-xs text-white/40">
            {checkins.length}/{totalTeamSize} kolléga küldött be
          </span>
        </div>

        <div className="mt-3 text-center">
          <div className="text-3xl font-bold text-white">
            {average !== null ? `${average}%` : "–"}
          </div>
          <p className="text-xs text-white/40">csapat átlag</p>
        </div>

        <div className="mt-5 space-y-3">
          {sorted.length === 0 && (
            <p className="text-center text-sm text-white/40">Még senki nem küldött be adatot erre a hétre.</p>
          )}
          {sorted.map((c) => (
            <EnergyBar
              key={c.user_id}
              name={c.full_name}
              value={c.energy_level}
              highlight={c.user_id === userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
