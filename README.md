# Star Network Hub

Belső csapat-webapp a Star Network számára. Az első funkció: **heti hétindító energiaszint check-in** — minden kolléga egy csúszkával jelzi hétfő reggel, hányan áll az energiaszintje, a rendszer pedig azonnal mutatja a csapatátlagot és mindenki saját értékét, élőben frissülve (jó a 9:30-as meetinghez).

A projekt Next.js (App Router) + Supabase (auth + adatbázis) + telepíthető PWA. Ez a README lépésről lépésre végigvisz az élesítésen: **Supabase → GitHub → Vercel**.

---

## 0. Mielőtt elkezdenéd

Szükséged lesz:
- egy [supabase.com](https://supabase.com) fiókra (ingyenes tier elég induláshoz)
- egy [github.com](https://github.com) fiókra
- egy [vercel.com](https://vercel.com) fiókra (be tudsz jelentkezni GitHub-bal is)
- Node.js 18+ a géped, ha helyben is ki akarod próbálni (nem kötelező)

---

## 1. Supabase projekt létrehozása

1. Lépj be a [supabase.com](https://supabase.com/dashboard) oldalra, kattints **New project**-re.
2. Adj neki nevet (pl. `star-network-hub`), válassz jelszót az adatbázisnak (mentsd el), régiónak érdemes `Central EU (Frankfurt)`-ot választani.
3. Várd meg, míg a projekt létrejön (kb. 1-2 perc).
4. Bal oldali menü → **SQL Editor** → **New query**.
5. Nyisd meg a repóban a `supabase/schema.sql` fájlt, másold be a teljes tartalmát, és nyomj **Run**-t.
   - Ez létrehozza a `profiles` és `checkins` táblákat, a jogosultsági (RLS) szabályokat, és bekapcsolja rájuk az élő (realtime) frissítést.
6. Bal oldali menü → **Project Settings → API**. Innen kell majd két érték a Vercel-hez:
   - **Project URL** (pl. `https://xxxx.supabase.co`)
   - **anon public** kulcs

### Kollégák meghívása (fontos: nincs nyilvános regisztráció)

Az app szándékosan nem enged bárkinek regisztrálni — csak azok tudnak belépni, akiket te meghívsz.

1. Bal oldali menü → **Authentication → Users → Invite user**.
2. Add meg a kolléga e-mail címét (pl. céges cím). A rendszer küld neki egy e-mailt, amiben beállíthatja a jelszavát.
3. Ismételd meg minden kollégának, aki használja az appot.
4. *(Opcionális)* Authentication → Providers → Email alatt kikapcsolhatod az "Allow new users to sign up" opciót is, dupla biztosítékként.

Amikor egy kolléga először lép be, az app megkérdezi a nevét (ez jelenik meg a csapat nézetben), és elmenti a `profiles` táblába.

---

## 2. Kód felküldése GitHub-ra

A `star-network-app` mappa egy teljes, kész Next.js projekt. Egy még nem létező GitHub repóba kell feltölteni:

```bash
cd star-network-app
git init
git add .
git commit -m "Star Network Hub - első verzió"
```

Hozz létre egy **üres** repót a GitHub-on (pl. `star-network-hub`), NE pipáld ki a README/.gitignore opciókat, majd:

```bash
git branch -M main
git remote add origin https://github.com/<felhasznalonev>/star-network-hub.git
git push -u origin main
```

---

## 3. Vercel deploy

1. Lépj be a [vercel.com](https://vercel.com) oldalra, **Add New → Project**.
2. Importáld a most feltöltött GitHub repót.
3. A **Framework Preset** automatikusan `Next.js`-t fog felismerni — ezen nem kell módosítani.
4. **Environment Variables** alatt add hozzá a Supabase-ből másolt két értéket:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | a Supabase Project URL-ed |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | a Supabase anon public kulcsod |

5. Kattints **Deploy**-ra. Pár perc múlva megkapod az élő linket (pl. `star-network-hub.vercel.app`).

### Saját domain (opcionális)

Ha szeretnétek pl. `hub.starnetwork.hu` címen elérni: Vercel projekt → **Settings → Domains** → add hozzá a domaint, majd a DNS szolgáltatótoknál állítsd be a Vercel által mutatott CNAME/A rekordot.

---

## 4. Telepítés kollégák telefonjára (PWA)

Az app egy telepíthető webapp (PWA) — nem kell App Store/Play Store.

**Androidon (Chrome):**
1. Nyisd meg a Vercel linket Chrome-ban.
2. Jelentkezz be.
3. Jobb felső menü (⋮) → **Alkalmazás telepítése** / **Hozzáadás a kezdőképernyőhöz**.

**iPhone-on (Safari):**
1. Nyisd meg a linket Safariban.
2. Jelentkezz be.
3. Megosztás gomb (□↑) → **Hozzáadás a kezdőképernyőhöz**.

Ezután az app ikonja (a csillagos SN logó) megjelenik a telefonon, natív appként nyílik meg, cím- és keresősáv nélkül.

---

## 5. Helyi fejlesztés (ha bővítenéd az appot)

```bash
cd star-network-app
npm install
cp .env.local.example .env.local
# írd be a .env.local-ba a Supabase URL-t és anon kulcsot
npm run dev
```

Az app ezután elérhető: `http://localhost:3000`

---

## Projekt felépítés

```
app/
  login/           bejelentkezés
  onboarding/       első belépéskor: név megadása
  page.tsx          fő dashboard: energia check-in + csapat nézet
components/
  EnergyCheckin.tsx slider, beküldés, élő csapat-nézet
  EnergyBar.tsx     egy kolléga energiaszint sávja
lib/supabase/       Supabase kliens (böngésző, szerver, middleware)
supabase/schema.sql adatbázis séma + jogosultságok
public/             logók, háttérképek, PWA ikonok, manifest.json
```

## Mi jön a következő körben?

Ez a séma és keretrendszer (auth, sötét kozmikus dizájn, telepíthető app, Supabase adatbázis) úgy készült, hogy könnyen bővíthető legyen új modulokkal — pl. "mit vársz a héttől" / "legnagyobb kihívás" mezők, influencer adatbázis, kampány tracker, stb. Szólj, és folytatjuk a következő funkcióval.
