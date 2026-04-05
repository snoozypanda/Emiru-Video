import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Search,
  Plus,
  Pencil,
  Phone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { MOCK_MEMBERS, Member, MemberTier } from "@/lib/types";
import MemberModal from "@/components/MemberModal";

const ITEMS_PER_PAGE = 8;

const tierColors: Record<MemberTier, { bg: string; text: string; border: string }> = {
  Standard: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
  VIP: { bg: "bg-yellow-500/20", text: "text-yellow-700", border: "border-yellow-500/30" },
  Trusted: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20" },
  Gold: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/20" },
  New: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20" },
};

const NewMembersPage = () => {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "On Rent" | "Returned">("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch = m.full_name.toLowerCase().includes(search.toLowerCase()) || m.phone_number.includes(search);
      const matchesStatus = statusFilter === "All" || m.rentalStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= Math.min(6, totalPages); i++) pages.push(i);
    if (totalPages > 6) {
      pages.push("—");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages]);

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<Member>) => {
    if (selectedMember) {
      // Edit
      setMembers(members.map((m) => 
        m.id === selectedMember.id ? { ...m, ...data } : m
      ));
    } else {
      // Add
      const newMember: Member = {
        id: `mem-${Date.now()}`,
        full_name: data.full_name || "",
        phone_number: data.phone_number || "",
        tier: data.tier || "Standard",
        rentalStatus: data.rentalStatus || "Returned",
      };
      setMembers([newMember, ...members]);
    }
  };

  return (
    <AppLayout>
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search members"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 bg-muted/50 rounded-lg text-sm font-body outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium hover:bg-muted transition-colors capitalize"
            >
              All Statuses
              <ChevronDown size={14} />
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[140px]">
                {(["All", "On Rent", "Returned"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setShowFilterDropdown(false); setCurrentPage(1); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${statusFilter === s ? "font-bold" : ""}`}
                  >
                    {s === "All" ? "All Statuses" : s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>

        {/* Members List */}
        <div className="divide-y divide-border">
          {paginated.map((member) => {
            const tierStyle = tierColors[member.tier];
            return (
              <div
                key={member.id}
                className="flex items-center justify-between px-6 py-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-foreground">
                    {member.full_name[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                       <p className="text-base font-bold text-foreground leading-none">{member.full_name}</p>
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
                        {member.tier}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{member.phone_number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  {member.rentalStatus === "On Rent" ? (
                    <span className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                      On Rent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 h-9 rounded-lg border border-border text-foreground text-xs font-bold">
                      <span className="text-green-500">✓</span>
                      Returned
                    </span>
                  )}

                  {/* Edit button */}
                  <button
                    onClick={() => handleEdit(member)}
                    className="w-9 h-9 flex items-center justify-center bg-muted/80 text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
                    title="Edit member"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {paginated.length === 0 && (
            <p className="text-center py-12 text-muted-foreground text-sm">No members found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 py-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              title="Previous page"
              aria-label="Previous page"
              className="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {pageNumbers.map((p, i) =>
              typeof p === "number" ? (
                <button
                  key={i}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === p ? "bg-foreground text-background" : "hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ) : (
                <span key={i} className="px-1 text-muted-foreground">{p}</span>
              )
            )}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              title="Next page"
              aria-label="Next page"
              className="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editMember={selectedMember}
      />
    </AppLayout>
  );
};

export default NewMembersPage;
