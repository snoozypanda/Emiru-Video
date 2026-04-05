import { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { InventoryItem } from "@/lib/types";

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<InventoryItem>) => void;
  editItem?: InventoryItem | null;
}

const InventoryModal = ({ isOpen, onClose, onSave, editItem }: InventoryModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Camera");
  const [status, setStatus] = useState<"In Store" | "Rented">("In Store");
  const [serialNumber, setSerialNumber] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategory(editItem.category);
      setStatus(editItem.status);
      setSerialNumber(editItem.serialNumber || "");
      setPrice(String(editItem.price || ""));
    } else {
      setName("");
      setCategory("Camera");
      setStatus("In Store");
      setSerialNumber("");
      setPrice("");
    }
  }, [editItem, isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      category,
      status,
      serialNumber,
      price: Number(price) || 0,
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
        className="bg-white w-full max-w-md rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden border border-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {editItem ? "Edit Item" : "Add Item"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSave} className="px-8 pb-8 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Item Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sony A7IV"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="Camera">Camera</option>
                <option value="Lighting">Lighting</option>
                <option value="Sound">Sound</option>
                <option value="Gear">Gear</option>
                <option value="Lens">Lens</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Price (ETB)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as InventoryItem["status"])}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="In Store">In Store</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Serial Number
              </label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="CAM-01"
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-black text-white text-sm font-bold shadow-lg hover:translate-y-[1px] transition-transform"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;
