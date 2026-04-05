import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Download,
  Minus,
  Plus,
  Printer,
  Search,
  X,
} from "lucide-react";
import { Client, MOCK_CLIENTS, MOCK_PRODUCTS } from "@/lib/types";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Client>) => void;
  editClient?: Client | null;
  isScheduled?: boolean;
}

interface ProductRow {
  id: string;
  product_name: string;
  quantity: number;
}

const CATEGORIES = ["Camera/ Lens", "Lighting", "Sound", "Gear"] as const;
type Category = (typeof CATEGORIES)[number];

const AddClientModal = ({ isOpen, onClose, onSave, editClient, isScheduled = false }: AddClientModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [dateEnd, setDateEnd] = useState("");
  const [paid, setPaid] = useState("");
  const [suggestions, setSuggestions] = useState<Client[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Categorized products state
  // Categorized products state
  const [categorizedProducts, setCategorizedProducts] = useState<Record<Category, ProductRow[]>>({
    "Camera/ Lens": [],
    "Lighting": [],
    "Sound": [],
    "Gear": [],
  });
  const [customTotal, setCustomTotal] = useState<string | null>(null);

  useEffect(() => {
    if (editClient) {
      setFullName(editClient.full_name);
      setPhone(editClient.phone_number);
      setDate(editClient.date);
      setDateEnd(editClient.date_end || "");
      setPaid(String(editClient.paid || ""));
      // Handle legacy clients or set total if exists
      if (editClient.remain + editClient.paid !== 0) {
        setCustomTotal(String(editClient.remain + editClient.paid));
      }

      // Distribute existing products into categories if matching
      const distribution: Record<Category, ProductRow[]> = {
        "Camera/ Lens": [],
        "Lighting": [],
        "Sound": [],
        "Gear": [],
      };

      editClient.products.forEach((p) => {
        const productDef = MOCK_PRODUCTS.find((mp) => mp.name === p.product_name);
        if (productDef?.category === "Camera") distribution["Camera/ Lens"].push(p);
        else if (productDef?.category === "Lighting") distribution["Lighting"].push(p);
        else if (productDef?.category === "Sound") distribution["Sound"].push(p);
        else distribution["Gear"].push(p);
      });

      setCategorizedProducts(distribution);
    } else {
      setFullName("");
      setPhone("");
      setDate(new Date().toLocaleDateString("en-US"));
      setDateEnd("");
      setPaid("");
      setCustomTotal(null);
      setCategorizedProducts({
        "Camera/ Lens": [{ id: "1", product_name: "", quantity: 1 }],
        "Lighting": [],
        "Sound": [],
        "Gear": [],
      });
    }
  }, [editClient, isOpen]);

  const addItem = (category: Category) => {
    setCategorizedProducts((prev) => ({
      ...prev,
      [category]: [...prev[category], { id: String(Date.now()), product_name: "", quantity: 1 }],
    }));
  };

  const updateItem = (
    category: Category,
    id: string,
    field: keyof ProductRow,
    value: ProductRow[keyof ProductRow],
  ) => {
    setCategorizedProducts((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeItem = (category: Category, id: string) => {
    setCategorizedProducts((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  };

  const incrementQuantity = (category: Category, id: string, delta: number) => {
    setCategorizedProducts((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    }));
  };

  const allProductsFlat = useMemo(() => {
    return Object.values(categorizedProducts).flat();
  }, [categorizedProducts]);

  const autoCalculatedTotal = useMemo(() => {
    return allProductsFlat.reduce((sum, p) => {
      const product = MOCK_PRODUCTS.find((mp) => mp.name === p.product_name);
      return sum + (product ? p.quantity * product.price : 0);
    }, 0);
  }, [allProductsFlat]);

  const finalTotal = customTotal !== null ? Number(customTotal) || 0 : autoCalculatedTotal;
  const remain = finalTotal - (Number(paid) || 0);

  const handleNameChange = (value: string) => {
    setFullName(value);
    const results = MOCK_CLIENTS.filter((c) => c.full_name.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
  };

  const applySuggestion = (client: Client) => {
    setFullName(client.full_name);
    setPhone(client.phone_number);
    setShowSuggestions(false);
  };

  const handleSave = () => {
    onSave({
      full_name: fullName,
      phone_number: phone,
      date,
      date_end: isScheduled ? dateEnd : undefined,
      products: allProductsFlat.filter((p) => p.product_name),
      paid: Number(paid) || 0,
      remain: Math.max(0, remain),
      status: "Active",
      type: isScheduled ? "scheduled" : "member",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden border border-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Top bar */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="grid w-full gap-3 md:grid-cols-[1.4fr,1fr,1fr]">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Search or enter name..."
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-10 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
                  />
                  {showSuggestions && (
                    <div className="absolute top-[110%] left-0 w-full rounded-xl border border-border bg-card shadow-2xl z-20 max-h-64 overflow-y-auto">
                      {suggestions.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => applySuggestion(s)}
                          className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                        >
                          <span className="font-bold">{s.full_name}</span>
                          <span className="text-xs text-muted-foreground">{s.phone_number}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number..."
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
                  />
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="text"
                    value={isScheduled && dateEnd ? `${date} - ${dateEnd}` : date}
                    readOnly
                    className="h-12 w-full rounded-xl border border-gray-200 bg-muted/30 px-4 text-sm font-bold text-gray-900 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="hidden md:inline-flex h-12 items-center gap-2 rounded-xl bg-black px-6 text-sm font-bold text-white shadow-xl transition hover:translate-y-[1px]"
              >
                <Download size={18} />
                Save Booking
              </button>
            </div>
          </div>

          {/* Product columns */}
          <div className="flex-1 overflow-y-auto px-8 py-4">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {CATEGORIES.map((category) => {
                const icon = category === "Camera/ Lens" ? "📷" : category === "Lighting" ? "📢" : category === "Sound" ? "〰️" : "🎥";
                const catFilter = category === "Camera/ Lens" ? "Camera" : category;
                const filteredList = MOCK_PRODUCTS.filter(p => p.category === catFilter);
                
                return (
                  <div
                    key={category}
                    className="flex flex-col rounded-[24px] bg-black p-4 text-white shadow-2xl h-fit border border-white/5"
                  >
                    <div className="mb-4 flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/50">
                      <span>{category}</span>
                      <span className="text-lg opacity-100">{icon}</span>
                    </div>

                    <div className="space-y-2.5">
                      {categorizedProducts[category].map((item) => (
                        <div
                          key={item.id}
                          className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 focus-within:border-white/20 transition-all"
                        >
                          <div className="flex items-center gap-1 rounded-xl bg-white/10 p-1">
                            <button
                              type="button"
                              onClick={() => incrementQuantity(category, item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-[10px] font-black">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => incrementQuantity(category, item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <input
                            list={`options-${category}`}
                            value={item.product_name}
                            onChange={(e) => updateItem(category, item.id, "product_name", e.target.value)}
                            placeholder="Select item..."
                            className="flex-1 bg-transparent pl-2 text-xs font-bold text-white placeholder-white/20 outline-none"
                          />
                          <button
                            onClick={() => removeItem(category, item.id)}
                            className="w-7 h-7 flex items-center justify-center text-white/20 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addItem(category)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-primary/10 hover:border-primary/50 hover:text-white transition-all group/add"
                    >
                      <Plus size={14} className="group-hover/add:scale-110 transition-transform" />
                      Add item
                    </button>

                    <datalist id={`options-${category}`}>
                      {filteredList.map((mp) => (
                        <option key={mp.id} value={mp.name} />
                      ))}
                    </datalist>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-8 py-6 bg-muted/10 border-t border-border/50">
            <div className="grid gap-4 md:grid-cols-4 items-end">
              <div className="space-y-1.5 font-bold">
                 <p className="text-[10px] uppercase text-muted-foreground ml-1">Auto-Calculated Total</p>
                 <div className="h-12 flex items-center rounded-xl border border-border bg-muted/20 px-4 text-xs font-bold text-muted-foreground">
                   {autoCalculatedTotal.toLocaleString()} ETB
                 </div>
              </div>
              <div className="space-y-1.5 font-bold">
                 <p className="text-[10px] uppercase text-primary ml-1">Final Adjusted Total</p>
                 <input
                  type="number"
                  value={customTotal !== null ? customTotal : autoCalculatedTotal}
                  onChange={(e) => setCustomTotal(e.target.value)}
                  placeholder="Final Price"
                  className="h-12 w-full rounded-xl border border-primary/50 bg-white px-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-primary"
                />
              </div>
              <div className="space-y-1.5 font-bold">
                 <p className="text-[10px] uppercase text-muted-foreground ml-1">Paid Amount (ETB)</p>
                 <input
                  type="number"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  placeholder="0.00"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20"
                />
              </div>
              <div className="space-y-1.5 font-bold">
                 <p className="text-[10px] uppercase text-muted-foreground ml-1">Remaining Balance</p>
                 <div className="h-12 flex items-center rounded-xl border border-gray-200 bg-muted/30 px-4 text-sm font-bold text-gray-900">
                   {remain > 0 ? remain.toLocaleString() : "0"} ETB
                 </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="h-12 w-44 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg hover:opacity-90 transition-opacity uppercase tracking-wider"
              >
                <Printer size={18} />
                Print Receipt
              </button>
              <button
                onClick={handleSave}
                className="h-12 w-44 flex items-center justify-center gap-2 rounded-xl bg-black text-white text-sm font-bold shadow-lg transition-transform hover:translate-y-[-1px]"
              >
                <Download size={18} />
                Save Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
