export interface Client {
  id: string;
  full_name: string;
  phone_number: string;
  date: string;
  date_end?: string; // for scheduled clients
  guarantor_name?: string;
  guarantor_phone?: string;
  products: ClientProduct[];
  paid: number;
  remain: number;
  status: "Active" | "Done";
  note?: string;
  file_url?: string;
  type: "member" | "pending" | "scheduled";
  created_at: string;
}

export interface ClientProduct {
  id: string;
  product_name: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  category: "Camera/ Lens" | "Lighting" | "Sound" | "Gear";
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Canon Mark III", quantity: 12, category: "Camera/ Lens" },
  { id: "2", name: "DJI RS3", quantity: 8, category: "Gear" },
  { id: "3", name: "Sony A7III", quantity: 5, category: "Camera/ Lens" },
  { id: "4", name: "Rode NTG5", quantity: 15, category: "Sound" },
  { id: "5", name: "Aputure 300D", quantity: 6, category: "Lighting" },
  { id: "6", name: "DJI Mavic 3", quantity: 4, category: "Gear" },
  { id: "7", name: "Zhiyun Crane", quantity: 10, category: "Gear" },
  { id: "8", name: "Atomos Ninja", quantity: 7, category: "Gear" },
  { id: "9", name: "Blackmagic 6K", quantity: 3, category: "Camera/ Lens" },
  { id: "10", name: "Sennheiser MKE", quantity: 9, category: "Sound" },
  { id: "11", name: "Manfrotto Tripod", quantity: 20, category: "Gear" },
  { id: "12", name: "Godox SL60W", quantity: 11, category: "Lighting" },
  { id: "13", name: "SmallRig Cage", quantity: 14, category: "Gear" },
  { id: "14", name: "Tilta Follow Focus", quantity: 6, category: "Gear" },
  { id: "15", name: "NanLite Tube", quantity: 8, category: "Lighting" },
  { id: "16", name: "Hollyland Mars", quantity: 5, category: "Gear" },
  { id: "17", name: "Deity S-Mic 2", quantity: 7, category: "Sound" },
  { id: "18", name: "Canon RF 24-70", quantity: 4, category: "Camera/ Lens" },
  { id: "19", name: "Sony 85mm f/1.4", quantity: 3, category: "Camera/ Lens" },
  { id: "20", name: "DJI Ronin 4D", quantity: 2, category: "Camera/ Lens" },
  { id: "21", name: "RED Komodo", quantity: 1, category: "Camera/ Lens" },
  { id: "22", name: "Sigma 18-35mm", quantity: 6, category: "Camera/ Lens" },
  { id: "23", name: "Neewer LED Panel", quantity: 15, category: "Lighting" },
  { id: "24", name: "Zoom F6 Recorder", quantity: 4, category: "Sound" },
  { id: "25", name: "Pelican Case 1510", quantity: 10, category: "Gear" },
  { id: "26", name: "V-Mount Battery", quantity: 18, category: "Gear" },
  { id: "27", name: "Wireless Lav Kit", quantity: 8, category: "Sound" },
  { id: "28", name: "Cine Lens Set", quantity: 2, category: "Camera/ Lens" },
  { id: "29", name: "Monitor Mount", quantity: 12, category: "Gear" },
  { id: "30", name: "Slider 120cm", quantity: 5, category: "Gear" },
  { id: "31", name: "Jib Crane", quantity: 3, category: "Gear" },
  { id: "32", name: "Green Screen", quantity: 6, category: "Gear" },
  { id: "33", name: "Backdrop Stand", quantity: 9, category: "Gear" },
  { id: "34", name: "Reflector 5-in-1", quantity: 14, category: "Gear" },
  { id: "35", name: "C-Stand", quantity: 20, category: "Gear" },
  { id: "36", name: "Sandbag Set", quantity: 25, category: "Gear" },
  { id: "37", name: "Gaffer Tape", quantity: 30, category: "Gear" },
  { id: "38", name: "SD Card 128GB", quantity: 40, category: "Gear" },
];

export const MOCK_CLIENTS: Client[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  full_name: "Eyasu kebede",
  phone_number: "0930239907",
  date: "2/24/2026",
  products: [{ id: "1", product_name: "Canon Mark III", quantity: 2 }],
  paid: [3000, 0, 200, 5078, 0, 1210, 500, 0][i % 8],
  remain: [3000, 0, 200, 5078, 0, 1210, 500, 0][i % 8],
  status: (i === 1 ? "Done" : "Active") as "Active" | "Done",
  type: "member" as const,
  created_at: new Date().toISOString(),
}));
