import { useState, useEffect } from "react";
import { X, CloudUpload, Plus, Trash2 } from "lucide-react";
import { Client, MOCK_PRODUCTS } from "@/lib/types";

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

const AddClientModal = ({ isOpen, onClose, onSave, editClient, isScheduled = false }: AddClientModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [dateEnd, setDateEnd] = useState("");
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorPhone, setGuarantorPhone] = useState("");
  const [products, setProducts] = useState<ProductRow[]>([
    { id: "1", product_name: "", quantity: 1 },
  ]);
  const [paid, setPaid] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (editClient) {
      setFullName(editClient.full_name);
      setPhone(editClient.phone_number);
      setDate(editClient.date);
      setDateEnd(editClient.date_end || "");
      setGuarantorName(editClient.guarantor_name || "");
      setGuarantorPhone(editClient.guarantor_phone || "");
      setProducts(editClient.products.length > 0 ? editClient.products : [{ id: "1", product_name: "", quantity: 1 }]);
      setPaid(String(editClient.paid || ""));
      setNote(editClient.note || "");
    } else {
      setFullName("");
      setPhone("");
      setDate(new Date().toLocaleDateString("en-US"));
      setDateEnd("");
      setGuarantorName("");
      setGuarantorPhone("");
      setProducts([{ id: "1", product_name: "", quantity: 1 }]);
      setPaid("");
      setNote("");
      setFile(null);
    }
  }, [editClient, isOpen]);

  const addProductRow = () => {
    setProducts([...products, { id: String(Date.now()), product_name: "", quantity: 1 }]);
  };

  const removeProductRow = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: string, value: string | number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const totalValue = products.reduce((sum, p) => {
    const product = MOCK_PRODUCTS.find((mp) => mp.name === p.product_name);
    return sum + (product ? p.quantity * 500 : 0); // mock price
  }, 0);

  const remain = totalValue - (Number(paid) || 0);

  const handleSave = () => {
    onSave({
      full_name: fullName,
      phone_number: phone,
      date,
      date_end: isScheduled ? dateEnd : undefined,
      guarantor_name: guarantorName,
      guarantor_phone: guarantorPhone,
      products,
      paid: Number(paid) || 0,
      remain: Math.max(0, remain),
      note,
      status: "Active",
      type: isScheduled ? "scheduled" : "member",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-[100]" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Phone + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Date</label>
              {isScheduled ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Start date"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
                  />
                  <input
                    type="text"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    placeholder="End date"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
                />
              )}
            </div>
          </div>

          {/* Guarantor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Guarantor Name</label>
              <input
                type="text"
                value={guarantorName}
                onChange={(e) => setGuarantorName(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Guarantor Phone No_</label>
              <input
                type="text"
                value={guarantorPhone}
                onChange={(e) => setGuarantorPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">Product</label>
              <button
                onClick={addProductRow}
                className="flex items-center gap-1 px-3 py-1 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors"
              >
                <Plus size={12} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {products.map((p) => (
                <div key={p.id} className="flex gap-2 items-center">
                  <select
                    value={p.product_name}
                    onChange={(e) => updateProduct(p.id, "product_name", e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm outline-none bg-card appearance-none"
                  >
                    <option value="">Select product</option>
                    {MOCK_PRODUCTS.map((mp) => (
                      <option key={mp.id} value={mp.name}>{mp.name}</option>
                    ))}
                  </select>
                  <select
                    value={p.quantity}
                    onChange={(e) => updateProduct(p.id, "quantity", Number(e.target.value))}
                    className="w-20 px-3 py-2.5 border border-border rounded-lg text-sm outline-none bg-card appearance-none"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  {products.length > 1 && (
                    <button onClick={() => removeProductRow(p.id)} className="p-1 text-muted-foreground hover:text-primary">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Paid / Remain */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Paid</label>
              <input
                type="number"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                placeholder="5000.00"
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Remain</label>
              <input
                type="text"
                value={remain > 0 ? remain.toFixed(2) : "0.00"}
                readOnly
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none bg-muted"
              />
            </div>
          </div>

          {/* File Upload */}
          <div
            className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => document.getElementById("file-upload")?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
            }}
          >
            <CloudUpload size={40} className="text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground italic">
              {file ? file.name : "Drag your file here"}
            </p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }}
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hi."
              rows={3}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none resize-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {isScheduled ? "Scheduled Client" : editClient ? "Edit Client" : "Add Client"}
            </h3>
            <button
              onClick={handleSave}
              className="px-8 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
