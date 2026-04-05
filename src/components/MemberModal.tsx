import { useEffect, useState } from "react";
import { X, User, Phone, ShieldCheck } from "lucide-react";
import { Member, MemberTier } from "@/lib/types";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Member>) => void;
  editMember?: Member | null;
}

const MemberModal = ({ isOpen, onClose, onSave, editMember }: MemberModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState<MemberTier>("Standard");
  const [rentalStatus, setRentalStatus] = useState<"On Rent" | "Returned">("Returned");

  useEffect(() => {
    if (editMember) {
      setFullName(editMember.full_name);
      setPhone(editMember.phone_number);
      setTier(editMember.tier);
      setRentalStatus(editMember.rentalStatus);
    } else {
      setFullName("");
      setPhone("");
      setTier("Standard");
      setRentalStatus("Returned");
    }
  }, [editMember, isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      full_name: fullName,
      phone_number: phone,
      tier,
      rentalStatus,
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
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User size={24} className="text-primary" />
            {editMember ? "Edit Member" : "Add Member"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSave} className="px-8 pb-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
               Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Eyasu Kebede"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
               Phone Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0930239907"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
               <label className="text-sm font-bold text-gray-700 ml-1">
                  Membership Tier
               </label>
               <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as MemberTier)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat"
               >
                  <option value="Standard">Standard</option>
                  <option value="VIP">VIP</option>
                  <option value="Gold">Gold</option>
                  <option value="Trusted">Trusted</option>
                  <option value="New">New</option>
               </select>
            </div>
            <div className="space-y-1.5">
               <label className="text-sm font-bold text-gray-700 ml-1">
                  Rental Status
               </label>
               <select
                  value={rentalStatus}
                  onChange={(e) => setRentalStatus(e.target.value as Member["rentalStatus"])}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:border-black/20 focus:ring-black/60 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat"
               >
                  <option value="Returned">Returned</option>
                  <option value="On Rent">On Rent</option>
               </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:translate-y-[1px] transition-transform uppercase tracking-wider"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;
