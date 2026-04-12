import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Download,
  Minus,
  Phone,
  Plus,
  Printer,
  Search,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { Client, MOCK_CLIENTS, MOCK_PRODUCTS } from "@/lib/types";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Client>) => void;
  editClient?: Client | null;
  isScheduled?: boolean;
  penaltyOnly?: boolean;
}

interface ProductRow {
  id: string;
  product_name: string;
  quantity: number;
}

const CATEGORIES = ["Camera/ Lens", "Lighting", "Sound", "Gear", "Mount"] as const;
type Category = (typeof CATEGORIES)[number];

const PAYMENT_METHODS = ["Awash Bank", "CBE", "TeleBirr", "Dashen Bank", "Abyssinia", "Cash"];

const AddClientModal = ({ isOpen, onClose, onSave, editClient, isScheduled = false, penaltyOnly = false }: AddClientModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [dateEnd, setDateEnd] = useState("");
  const [paid, setPaid] = useState("");
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorPhone, setGuarantorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [penalty, setPenalty] = useState("");
  const [showGuarantor, setShowGuarantor] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<Client[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Categorized products state
  // Categorized products state
  const [categorizedProducts, setCategorizedProducts] = useState<Record<Category, ProductRow[]>>({
    "Camera/ Lens": [],
    "Lighting": [],
    "Sound": [],
    "Gear": [],
    "Mount": [],
  });
  const [customTotal, setCustomTotal] = useState<string | null>(null);

  useEffect(() => {
    if (editClient) {
      setFullName(editClient.full_name);
      setPhone(editClient.phone_number);
      setDate(editClient.date);
      setDateEnd(editClient.date_end || "");
      setPaid(String(editClient.paid || ""));
      setPenalty(String(editClient.penalty || ""));
      setPaymentMethod(editClient.payment_method || "");
      setGuarantorName(editClient.guarantor_name || "");
      setGuarantorPhone(editClient.guarantor_phone || "");
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
        "Mount": [],
      };

      editClient.products.forEach((p) => {
        const productDef = MOCK_PRODUCTS.find((mp) => mp.name === p.product_name);
        if (productDef?.category === "Camera") distribution["Camera/ Lens"].push(p);
        else if (productDef?.category === "Lighting") distribution["Lighting"].push(p);
        else if (productDef?.category === "Sound") distribution["Sound"].push(p);
        else if (productDef?.category === "Mount") distribution["Mount"].push(p);
        else distribution["Gear"].push(p);
      });

      setCategorizedProducts(distribution);
    } else {
      setFullName("");
      setPhone("");
      setDate(new Date().toLocaleDateString("en-US"));
      setDateEnd("");
      setPaid("");
      setPenalty("");
      setCustomTotal(null);
      setCategorizedProducts({
        "Camera/ Lens": [{ id: "1", product_name: "", quantity: 1 }],
        "Lighting": [],
        "Sound": [],
        "Gear": [],
        "Mount": [],
      });
      setPaymentMethod("");
      setGuarantorName("");
      setGuarantorPhone("");
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
      payment_method: paymentMethod,
      penalty: Number(penalty) || 0,
      guarantor_name: guarantorName,
      guarantor_phone: guarantorPhone,
    });
    onClose();
  };

  if (!isOpen) return null;

  // Penalty-only compact modal for Pending page
  if (penaltyOnly && editClient) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-md rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden border border-black/5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-black px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emiru-yellow/20 flex items-center justify-center">
                <ShieldCheck size={20} className="text-emiru-yellow" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Edit Penalty</p>
                <p className="text-sm font-bold text-white">{editClient.full_name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={16} className="text-white/60" />
            </button>
          </div>

          {/* Client Info Summary */}
          <div className="px-6 py-4 border-b border-border/50">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Phone</p>
                <p className="text-sm font-bold text-gray-900">{editClient.phone_number}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Date</p>
                <p className="text-sm font-bold text-gray-900">{editClient.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Paid</p>
                <p className="text-sm font-bold text-gray-900">{editClient.paid.toLocaleString()} ETB</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Remaining</p>
                <p className="text-sm font-bold text-gray-900">{editClient.remain.toLocaleString()} ETB</p>
              </div>
            </div>
            {editClient.products.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/30">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1.5">Products</p>
                <div className="flex flex-wrap gap-1.5">
                  {editClient.products.map((p) => (
                    <span key={p.id} className="px-2.5 py-1 rounded-full bg-muted text-[11px] font-bold text-gray-700">
                      {p.quantity}× {p.product_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Penalty Input */}
          <div className="px-6 py-5">
            <div className="rounded-2xl border-2 border-emiru-red/20 bg-emiru-red/5 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-emiru-red mb-2">Penalty Amount (ETB)</p>
              <input
                type="number"
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                placeholder="0.00"
                autoFocus
                className="w-full text-2xl font-black text-gray-900 bg-transparent outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave({ penalty: Number(penalty) || 0 });
                onClose();
              }}
              className="flex-1 h-12 rounded-xl bg-black text-white text-sm font-bold shadow-lg transition-transform hover:translate-y-[-1px]"
            >
              Update Penalty
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-y-auto border border-black/5"
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                  className="flex h-12 w-full min-w-[180px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900 outline-none hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span className="truncate">{paymentMethod || "Payment Method"}</span>
                  <ChevronDown size={18} className={`transition-transform flex-shrink-0 ${showPaymentDropdown ? "rotate-180" : ""}`} />
                </button>
                {showPaymentDropdown && (
                  <div className="absolute top-[110%] right-0 w-full min-w-[180px] rounded-xl border border-border bg-white shadow-2xl z-[120] overflow-hidden">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(method);
                          setShowPaymentDropdown(false);
                        }}
                        className="flex w-full items-center px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors border-b border-gray-50 last:border-0"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product columns — horizontal scroll */}
          <div className="flex-1 overflow-hidden px-8 py-4">
            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin' }}>
              {CATEGORIES.map((category) => {
                const icon = category === "Camera/ Lens" ? "📷" : category === "Lighting" ? "💡" : category === "Sound" ? "🎙️" : category === "Mount" ? "🔭" : "🎥";
                const catFilter = category === "Camera/ Lens" ? "Camera" : category;
                const filteredList = MOCK_PRODUCTS.filter(p => p.category === catFilter);
                
                const categoryTotal = categorizedProducts[category].reduce((sum, p) => {
                  const product = MOCK_PRODUCTS.find((mp) => mp.name === p.product_name);
                  return sum + (product ? p.quantity * product.price : 0);
                }, 0);

                const itemCount = categorizedProducts[category].length;

                return (
                  <div
                    key={category}
                    className="flex flex-col rounded-[24px] bg-black p-4 text-white shadow-2xl border border-white/5 snap-start flex-shrink-0"
                    style={{ minWidth: '220px', width: 'calc((100% - 64px) / 5)' }}
                  >
                    {/* Category Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{category}</span>
                      </div>
                      {itemCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-[9px] font-black text-primary">
                          {itemCount}
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-2 flex-1 overflow-y-auto max-h-[200px]" style={{ scrollbarWidth: 'thin' }}>
                      {categorizedProducts[category].map((item) => (
                        <div
                          key={item.id}
                          className="group flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-1.5 focus-within:border-white/20 transition-all hover:bg-white/8"
                        >
                          <div className="flex items-center gap-0.5 rounded-xl bg-white/10 p-0.5">
                            <button
                              type="button"
                              onClick={() => incrementQuantity(category, item.id, -1)}
                              className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-4 text-center text-[10px] font-black">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => incrementQuantity(category, item.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <input
                            list={`options-${category}`}
                            value={item.product_name}
                            onChange={(e) => updateItem(category, item.id, "product_name", e.target.value)}
                            placeholder="Select..."
                            className="flex-1 min-w-0 bg-transparent pl-1.5 text-[11px] font-bold text-white placeholder-white/20 outline-none"
                          />
                          <button
                            onClick={() => removeItem(category, item.id)}
                            className="w-6 h-6 flex items-center justify-center text-white/20 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors flex-shrink-0"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addItem(category)}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 py-2 text-[9px] font-black uppercase tracking-widest text-white/35 hover:bg-primary/10 hover:border-primary/50 hover:text-white transition-all group/add"
                    >
                      <Plus size={12} className="group-hover/add:scale-110 transition-transform" />
                      Add item
                    </button>

                    <datalist id={`options-${category}`}>
                      {filteredList.map((mp) => (
                        <option key={mp.id} value={mp.name} />
                      ))}
                    </datalist>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-white/40 tracking-wider">Total</span>
                      <span className="text-[11px] font-black text-primary">{categoryTotal.toLocaleString()} ETB</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-8 py-6 bg-muted/10 border-t border-border/50">
            {/* Guarantor Card — collapsible dark card */}
            <div className="mb-6 rounded-[20px] bg-black border border-white/5 shadow-xl overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => setShowGuarantor(!showGuarantor)}
                className="flex w-full items-center justify-between px-5 py-4 text-white hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${guarantorName || guarantorPhone ? 'bg-emiru-yellow/20' : 'bg-white/10'}`}>
                    <ShieldCheck size={18} className={`transition-colors duration-300 ${guarantorName || guarantorPhone ? 'text-emiru-yellow' : 'text-white/50'}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Guarantor</p>
                    <p className="text-xs font-bold text-white/80">
                      {guarantorName ? guarantorName : 'Add guarantor details'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {guarantorName && (
                    <span className="px-2.5 py-1 rounded-full bg-emiru-yellow/15 text-[10px] font-black text-emiru-yellow uppercase tracking-wider">
                      Added
                    </span>
                  )}
                  <ChevronRight size={16} className={`text-white/40 transition-transform duration-300 ${showGuarantor ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {showGuarantor && (
                <div className="px-5 pb-5 pt-1 border-t border-white/5">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-1.5 focus-within:border-white/20 transition-all">
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
                        <User size={14} className="text-white/40" />
                      </div>
                      <input
                        type="text"
                        value={guarantorName}
                        onChange={(e) => setGuarantorName(e.target.value)}
                        placeholder="Guarantor full name..."
                        className="flex-1 bg-transparent text-xs font-bold text-white placeholder-white/20 outline-none py-2 pr-3"
                      />
                    </div>
                    <div className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-1.5 focus-within:border-white/20 transition-all">
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
                        <Phone size={14} className="text-white/40" />
                      </div>
                      <input
                        type="text"
                        value={guarantorPhone}
                        onChange={(e) => setGuarantorPhone(e.target.value)}
                        placeholder="Guarantor phone..."
                        className="flex-1 bg-transparent text-xs font-bold text-white placeholder-white/20 outline-none py-2 pr-3"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-5 items-end">
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
                  <p className="text-[10px] uppercase text-emiru-red ml-1">Penalty Amount (ETB)</p>
                  <input
                   type="number"
                   value={penalty}
                   onChange={(e) => setPenalty(e.target.value)}
                   placeholder="0.00"
                   className="h-12 w-full rounded-xl border border-emiru-red/30 bg-white px-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-emiru-red"
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
