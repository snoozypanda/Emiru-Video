import { useState, useEffect, useMemo } from "react";
import { X, Save, Printer, Camera, Zap, Waves, Component, Check, Calendar } from "lucide-react";
import { Client, MOCK_PRODUCTS, Product } from "@/lib/types";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Client>) => void;
  editClient?: Client | null;
  isScheduled?: boolean;
}

const AddClientModal = ({ isOpen, onClose, onSave, editClient, isScheduled = false }: AddClientModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateRange, setDateRange] = useState("1/27/2026 - 1/29/2026");
  const [paid, setPaid] = useState("");
  const [remain, setRemain] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (editClient) {
      setFullName(editClient.full_name);
      setPhone(editClient.phone_number);
      setDateRange(editClient.date_end ? `${editClient.date} - ${editClient.date_end}` : editClient.date);
      setPaid(String(editClient.paid || ""));
      setRemain(String(editClient.remain || ""));
      
      const initialSelected: Record<string, number> = {};
      editClient.products.forEach(p => {
        const product = MOCK_PRODUCTS.find(mp => mp.name === p.product_name);
        if (product) initialSelected[product.id] = p.quantity;
      });
      setSelectedProducts(initialSelected);
    } else {
      setFullName("");
      setPhone("");
      setDateRange("1/27/2026 - 1/29/2026");
      setPaid("");
      setRemain("");
      setSelectedProducts({});
    }
  }, [editClient, isOpen]);

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  const updateQuantity = (id: string, qty: string) => {
    const val = parseInt(qty) || 0;
    setSelectedProducts(prev => ({ ...prev, [id]: val }));
  };

  const categories = ["Camera/ Lens", "Lighting", "Sound", "Gear"] as const;
  const categoryIcons = {
    "Camera/ Lens": <Camera size={20} />,
    "Lighting": <Zap size={20} />,
    "Sound": <Waves size={20} />,
    "Gear": <Component size={20} />
  };

  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    categories.forEach(cat => {
      grouped[cat] = MOCK_PRODUCTS.filter(p => p.category === cat).slice(0, 10); // Limit for UI mock consistency
    });
    return grouped;
  }, []);

  const handleSave = () => {
    const clientProducts = Object.entries(selectedProducts).map(([id, qty]) => {
      const p = MOCK_PRODUCTS.find(mp => mp.id === id);
      return { id, product_name: p?.name || "", quantity: qty };
    });

    onSave({
      full_name: fullName,
      phone_number: phone,
      date: dateRange.split(" - ")[0],
      date_end: dateRange.split(" - ")[1],
      products: clientProducts,
      paid: Number(paid) || 0,
      remain: Number(remain) || 0,
      status: "Active",
      type: isScheduled ? "scheduled" : "member",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-[32px] shadow-2xl w-full max-w-[1100px] p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Inputs */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Name..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="flex-1 px-5 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-emiru-black transition-colors"
          />
          <input
            type="text"
            placeholder="Phone...."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-5 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-emiru-black transition-colors"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="1/27/2026 - 1/29/2026"
              value={dateRange}
              readOnly
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-sm outline-none bg-white pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button
            onClick={handleSave}
            className="bg-emiru-black text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-gray-800 transition-colors"
          >
            <Save size={18} />
            <span>Save</span>
          </button>
        </div>

        {/* 4-Column Inventory Selector */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <div key={cat} className="flex flex-col bg-gray-50 rounded-[24px] overflow-hidden border border-gray-100">
              {/* Category Header */}
              <div className="bg-emiru-black text-white px-4 py-3 flex items-center justify-between">
                <span className="font-bold text-sm">{cat}</span>
                {categoryIcons[cat]}
              </div>
              
              {/* Product Rows */}
              <div className="p-2 space-y-1.5 max-h-[400px] overflow-y-auto">
                {productsByCategory[cat].map((product) => {
                  const isSelected = !!selectedProducts[product.id];
                  return (
                    <div key={product.id} className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-gray-200">
                      <button
                        onClick={() => toggleProduct(product.id)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected ? "bg-emiru-black border-emiru-black text-white" : "border-gray-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={4} />}
                      </button>
                      <span className="flex-1 text-[11px] font-bold text-gray-500 truncate">
                        {product.name}
                      </span>
                      <input
                        type="text"
                        value={isSelected ? selectedProducts[product.id] : "-"}
                        onChange={(e) => updateQuantity(product.id, e.target.value)}
                        readOnly={!isSelected}
                        className={`w-8 h-8 rounded-lg text-center text-xs font-bold outline-none border transition-colors ${
                          isSelected ? "bg-gray-100 border-gray-300" : "bg-white border-transparent text-gray-300"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Inputs and Actions */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-1 gap-4">
            <input
              type="text"
              placeholder="Paid ..."
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              className="flex-1 px-5 py-3 border border-gray-300 rounded-xl text-sm outline-none"
            />
            <input
              type="text"
              placeholder="Remain"
              value={remain}
              onChange={(e) => setRemain(e.target.value)}
              className="flex-1 px-5 py-3 border border-gray-300 rounded-xl text-sm outline-none"
            />
          </div>
          <button
            className="flex-1 bg-emiru-red text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-lg hover:bg-opacity-90 transition-opacity"
            onClick={() => window.print()}
          >
            <Printer size={22} className="mr-2" />
            Print
          </button>
        </div>

        {/* Close Button (Floating Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-emiru-black transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default AddClientModal;
