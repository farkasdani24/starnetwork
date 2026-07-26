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
// Az email/telefon mezők valós adatok a "Céges elérhetőségek.xlsx" alapján (2026.07.26).
// A fotók egyelőre a starnetwork.hu élő oldaláról töltődnek be (hotlink).
// Ha valakinek cserélni kell a képét, csak írd át a photoUrl-t egy másik linkre.
export const teamGroups: TeamGroup[] = [
  {
    title: "Vezetők",
    members: [
      {
        name: "Farkas Dániel",
        role: "Ügyvezető",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/10_Dani.jpg",
        phone: "36 20 288 4758",
        email1: "farkas.daniel.hd@gmail.com",
        email2: "farkas.daniel@starnetwork.hu",
      },
      {
        name: "Sápi Márton",
        role: "Értékesítési vezető",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/1_Marci.jpg",
        phone: "36 20 263 0601",
        email1: "sapi.marton.hd@gmail.com",
        email2: "sapi.marton@starnetwork.hu",
      },
      {
        name: "Sátori Karolina",
        role: "Projektmenedzser vezető",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/9_Lina.jpg",
        phone: "36 20 408 6039",
        email1: "satori.karolina.hd@gmail.com",
        email2: "satori.karolina@starnetwork.hu",
      },
    ],
  },
  {
    title: "Partnermenedzser csapat",
    members: [
      {
        name: "Balog Viktória",
        role: "Senior Partnermenedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/14_Viki.jpg",
        phone: "36 20 230 6287",
        email1: "balog.viktoria.hd@gmail.com",
        email2: "balog.viktoria@starnetwork.hu",
      },
      {
        name: "Malomsoki Virág",
        role: "Partnermenedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/15_Virag.jpg",
        phone: "36 20 210 9929",
        email1: "malomsoki.virag.hd@gmail.com",
        email2: "malomsoki.virag@starnetwork.hu",
      },
    ],
  },
  {
    title: "Tartalomgyártó csapat",
    members: [
      {
        name: "Csontos Bori",
        role: "Tartalomgyártó",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/7_Bori.jpg",
        phone: "36 70 337 6891",
        email1: "csontos.borbala.hd@gmail.com",
        email2: "csontos.borbala@starnetwork.hu",
      },
      {
        name: "Székely Gigi",
        role: "Tartalomgyártó",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/6_Gigi.jpg",
        phone: "36 30 744 6694",
        email1: "szekely.gigi.hd@gmail.com",
        email2: "szekely.gigi@starnetwork.hu",
      },
      {
        name: "Szabó Balázs",
        role: "Tartalomgyártó",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/8_Balazs.jpg",
        phone: "36 70 666 5499",
        email1: "szabo.balazs.sn@gmail.com",
        email2: "szabo.balazs.sn@starnetwork.hu",
      },
      {
        name: "Völgyi Anna",
        role: "Tartalomgyártó gyakornok",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/21_Anna-V.jpg",
        phone: "36 70 460 0652",
        email1: "volgyi.anna.hd@gmail.com",
        email2: "volgyi.anna@starnetwork.hu",
      },
      {
        name: "Fülöp Eszter",
        role: "Tartalomgyártó gyakornok",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/22_Eszti.jpg",
        phone: "36 20 311 9966",
        email1: "fulop.eszter.hd@gmail.com",
        email2: "fulop.eszter@starnetwork.hu",
      },
    ],
  },
  {
    title: "Influencer projektmenedzser csapat",
    members: [
      {
        name: "Lernyei Lőrinc",
        role: "Influencer projektmenedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/11_Lorinc.jpg",
        phone: "36 30 347 4586",
        email1: "lernyei.lorinc.hd@gmail.com",
        email2: "lernyei.lorinc@starnetwork.hu",
      },
      {
        name: "Kállai Gréta",
        role: "Influencer projektmenedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/23_Greti_2.jpg",
        phone: "36 70 522 0337",
        email1: "kalla.greta.hd@gmail.com",
        email2: "kalla.greta@starnetwork.hu",
      },
      {
        name: "Orgován Dorina",
        role: "Influencer projektmenedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/03/24_Dorina.jpg",
        phone: "36 20 369 8602",
        email1: "orgovan.dorina.sn@gmail.com",
        email2: "orgovan.dorina@starnetwork.hu",
      },
      {
        name: "Bakos Eszter",
        role: "Account menedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/07/25_Bakos-Eszti.jpg",
        phone: "36 20 684 3586",
        email1: "bakos.eszter.hd@gmail.com",
        email2: "bakos.eszter@starnetwork.hu",
      },
      {
        name: "Lázár Attila",
        role: "Account menedzser",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2026/07/26_Attila.jpg",
        phone: "36 20 281 7106",
        email1: "lazar.attila.hd@gmail.com",
        email2: "lazar.attila@starnetwork.hu",
      },
    ],
  },
  {
    title: "HR- és Backoffice csapat",
    members: [
      {
        name: "Katona-Krajczár Petra",
        role: "HR felelős",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/3_Petra.jpg",
        phone: "36 20 574 1749",
        email1: "krajczar.petra.hd@gmail.com",
      },
      {
        name: "Szentes Erika",
        role: "Irodafelelős",
        photoUrl: "https://starnetwork.hu/wp-content/uploads/2025/03/18_Erika.jpg",
        phone: "36 20 574 1749",
        email1: "szentes.erika.hd@gmail.com",
      },
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
