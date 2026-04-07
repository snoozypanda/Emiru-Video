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
  payment_method?: string;
  penalty?: number;
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
  category?: string;
  price: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  status: "Rented" | "In Store";
  serialNumber?: string;
  price?: number;
}

export interface HistoryEntry {
  id: string;
  type: "return" | "rent" | "edit" | "delete" | "add";
  description: string;
  timestamp: string;
}

export type MemberTier = "Standard" | "VIP" | "Trusted" | "Gold" | "New";

export interface Member {
  id: string;
  full_name: string;
  phone_number: string;
  tier: MemberTier;
  rentalStatus: "On Rent" | "Returned";
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Canon Mark III", quantity: 12, category: "Camera", price: 1500 },
  { id: "2", name: "DJI RS3", quantity: 8, category: "Gear", price: 800 },
  { id: "3", name: "Sony A7III", quantity: 5, category: "Camera", price: 1200 },
  { id: "4", name: "Rode NTG5", quantity: 15, category: "Sound", price: 400 },
  { id: "5", name: "Aputure 300D", quantity: 6, category: "Lighting", price: 600 },
  { id: "6", name: "DJI Mavic 3", quantity: 4, category: "Gear", price: 2000 },
  { id: "7", name: "Zhiyun Crane", quantity: 10, category: "Gear", price: 500 },
  { id: "8", name: "Atomos Ninja", quantity: 7, category: "Gear", price: 450 },
  { id: "9", name: "Blackmagic 6K", quantity: 3, category: "Camera", price: 2500 },
  { id: "10", name: "Sennheiser MKE", quantity: 9, category: "Sound", price: 300 },
  { id: "11", name: "Manfrotto Tripod", quantity: 20, category: "Gear", price: 150 },
  { id: "12", name: "Godox SL60W", quantity: 11, category: "Lighting", price: 200 },
  { id: "13", name: "SmallRig Cage", quantity: 14, category: "Gear", price: 100 },
  { id: "14", name: "Tilta Follow Focus", quantity: 6, category: "Gear", price: 350 },
  { id: "15", name: "NanLite Tube", quantity: 8, category: "Lighting", price: 180 },
  { id: "16", name: "Hollyland Mars", quantity: 5, category: "Sound", price: 550 },
  { id: "17", name: "Deity S-Mic 2", quantity: 7, category: "Sound", price: 350 },
  { id: "18", name: "Canon RF 24-70", quantity: 4, category: "Camera", price: 900 },
  { id: "19", name: "Sony 85mm f/1.4", quantity: 3, category: "Camera", price: 850 },
  { id: "20", name: "DJI Ronin 4D", quantity: 2, category: "Gear", price: 5000 },
  { id: "21", name: "RED Komodo", quantity: 1, category: "Camera", price: 8000 },
  { id: "22", name: "Sigma 18-35mm", quantity: 6, category: "Camera", price: 450 },
  { id: "23", name: "Neewer LED Panel", quantity: 15, category: "Lighting", price: 150 },
  { id: "24", name: "Zoom F6 Recorder", quantity: 4, category: "Sound", price: 750 },
  { id: "25", name: "Pelican Case 1510", quantity: 10, category: "Gear", price: 250 },
  { id: "26", name: "V-Mount Battery", quantity: 18, category: "Gear", price: 120 },
  { id: "27", name: "Wireless Lav Kit", quantity: 8, category: "Sound", price: 500 },
  { id: "28", name: "Cine Lens Set", quantity: 2, category: "Camera", price: 12000 },
  { id: "29", name: "Monitor Mount", quantity: 12, category: "Gear", price: 80 },
  { id: "30", name: "Slider 120cm", quantity: 5, category: "Gear", price: 350 },
  { id: "31", name: "Jib Crane", quantity: 3, category: "Gear", price: 1200 },
  { id: "32", name: "Green Screen", quantity: 6, category: "Gear", price: 100 },
  { id: "33", name: "Backdrop Stand", quantity: 9, category: "Gear", price: 150 },
  { id: "34", name: "Reflector 5-in-1", quantity: 14, category: "Gear", price: 50 },
  { id: "35", name: "C-Stand", quantity: 20, category: "Gear", price: 200 },
  { id: "36", name: "Sandbag Set", quantity: 25, category: "Gear", price: 40 },
  { id: "37", name: "Gaffer Tape", quantity: 30, category: "Gear", price: 25 },
  { id: "38", name: "SD Card 128GB", quantity: 40, category: "Gear", price: 60 },
  { id: "39", name: "Manfrotto 504HD", quantity: 5, category: "Mount", price: 150 },
  { id: "40", name: "Sachtler Flowtech 75", quantity: 3, category: "Mount", price: 500 },
  { id: "41", name: "EasyRig Minimax", quantity: 2, category: "Mount", price: 600 },
  { id: "42", name: "Shoulder Rig Kit", quantity: 4, category: "Mount", price: 300 },
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
  penalty: [0, 500, 0, 1000, 0][i % 5],
  type: (i % 5 === 0 ? "pending" : "member") as "member" | "pending",
  created_at: new Date().toISOString(),
}));

export const MOCK_INVENTORY: InventoryItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `inv-${i + 1}`,
  name: "Sony A7IV",
  category: "Camera",
  status: (i === 2 ? "In Store" : "Rented") as "Rented" | "In Store",
  serialNumber: `CAM-${String(i + 1).padStart(2, "0")}`,
}));

export const MOCK_HISTORY: HistoryEntry[] = [
  { id: "hist-1", type: "return", description: "Item 'CANON MARK III' was returned by EYASU KEBEDE.", timestamp: "1/30/2026 | 10:30AM" },
  { id: "hist-2", type: "rent", description: "Item 'DJI RS3' was rented to ABEBE BALCHA.", timestamp: "1/29/2026 | 2:15PM" },
  { id: "hist-3", type: "add", description: "New item 'SONY A7IV' added to inventory.", timestamp: "1/28/2026 | 9:00AM" },
  { id: "hist-4", type: "delete", description: "Item 'RODE NTG2' removed from inventory.", timestamp: "1/20/2026 | 4:45PM" },
  { id: "hist-5", type: "edit", description: "Price updated for 'BLACKMAGIC 6K'.", timestamp: "1/15/2026 | 11:00AM" },
  { id: "hist-6", type: "return", description: "Item 'RED KOMODO' returned by SAMUEL L.", timestamp: "1/5/2026 | 3:30PM" },
  { id: "hist-7", type: "rent", description: "Item 'APUTURE 300D' rented to LILLY K.", timestamp: "12/28/2025 | 1:00PM" },
  { id: "hist-8", type: "return", description: "Item 'ZHIYUN CRANE' returned.", timestamp: "12/15/2025 | 10:00AM" },
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `hist-${i + 9}`,
    type: (["return", "rent", "edit"] as const)[i % 3],
    description: `Automated history log entry #${i + 9}`,
    timestamp: "1/27/2026 | 9:00AM",
  }))
];

const TIERS: MemberTier[] = ["Standard", "VIP", "Trusted", "Gold", "New", "Standard", "VIP", "Trusted", "Gold"];

export const MOCK_MEMBERS: Member[] = Array.from({ length: 24 }, (_, i) => ({
  id: `mem-${i + 1}`,
  full_name: "Eyasu kebede",
  phone_number: "0930239907",
  tier: TIERS[i % TIERS.length],
  rentalStatus: (i === 2 ? "Returned" : "On Rent") as "On Rent" | "Returned",
}));
