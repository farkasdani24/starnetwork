export type TeamMember = {
  name: string;
  role: string;
  email1?: string;
  email2?: string;
  phone?: string;
  photoUrl?: string;
};

export type TeamGroup = {
  title: string;
  members: TeamMember[];
};

// Sablon adatok a starnetwork.hu/csapatunk oldal felépítése alapján.
// Az email/telefon mezők egyelőre üresek (placeholder) - töltsétek fel valós adatokkal.
// A fotók egyelőre a starnetwork.hu élő oldaláról töltődnek be (hotlink).
// Ha valakinek cserélni kell a képét, csak írd át a photoUrl-t egy másik linkre.
export const teamGroups: TeamGroup[] = [
  {
    title: "Vezetők",
    members: [
      { name: "Farkas Dániel", role: "Ügyvezető", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/10_Dani.jpg" },
      { name: "Sápi Márton", role: "Értékesítési vezető", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/1_Marci.jpg" },
      { name: "Sátori Karolina", role: "Projektmenedzser vezető", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/9_Lina.jpg" },
    ],
  },
  {
    title: "Partnermenedzser csapat",
    members: [
      { name: "Balog Viktória", role: "Senior Partnermenedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/14_Viki.jpg" },
      { name: "Malomsoki Virág", role: "Partnermenedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/15_Virag.jpg" },
    ],
  },
  {
    title: "Tartalomgyártó csapat",
    members: [
      { name: "Csontos Bori", role: "Tartalomgyártó", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/7_Bori.jpg" },
      { name: "Székely Gigi", role: "Tartalomgyártó", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/6_Gigi.jpg" },
      { name: "Szabó Balázs", role: "Tartalomgyártó", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/8_Balazs.jpg" },
      { name: "Völgyi Anna", role: "Tartalomgyártó gyakornok", photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/21_Anna-V.jpg" },
      { name: "Fülöp Eszter", role: "Tartalomgyártó gyakornok", photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/22_Eszti.jpg" },
    ],
  },
  {
    title: "Influencer projektmenedzser csapat",
    members: [
      { name: "Lernyei Lőrinc", role: "Influencer projektmenedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/11_Lorinc.jpg" },
      { name: "Kállai Gréta", role: "Influencer projektmenedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/23_Greti_2.jpg" },
      { name: "Orgován Dorina", role: "Influencer projektmenedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/24_Dorina.jpg" },
      { name: "Bakos Eszter", role: "Account menedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/07/25_Bakos-Eszti.jpg" },
      { name: "Lázár Attila", role: "Account menedzser", photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/07/26_Attila.jpg" },
    ],
  },
  {
    title: "HR- és Backoffice csapat",
    members: [
      { name: "Katona-Krajczár Petra", role: "HR felelős", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/3_Petra.jpg" },
      { name: "Szentes Erika", role: "Irodafelelős", photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/18_Erika.jpg" },
    ],
  },
];

const AVATAR_COLORS = ["#2F5597", "#E86524", "#5B85C9", "#F58B4D", "#3A2F5C"];

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
