import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
} from "lucide-react";
import { MOCK_INVENTORY, InventoryItem } from "@/lib/types";
import InventoryModal from "@/components/InventoryModal";

const ITEMS_PER_PAGE = 8;

const AdminPage = () => {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Rented" | "In Store">("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        (item.serialNumber && item.serialNumber.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const handleSave = (data: Partial<InventoryItem>) => {
    if (selectedItem) {
      // Edit existing
      setItems(items.map((item) => 
        item.id === selectedItem.id ? { ...item, ...data } : item
      ));
    } else {
      // Add new
      const newItem: InventoryItem = {
        id: `inv-${Date.now()}`,
        name: data.name || "",
        category: data.category || "Camera",
        status: data.status || "In Store",
        serialNumber: data.serialNumber,
      };
      setItems([newItem, ...items]);
    }
  };

  return (
    <AppLayout>
      <div className="bg-card rounded-xl">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-muted rounded-lg text-sm font-body outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              All Statuses
              <ChevronDown size={14} />
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[140px]">
                {(["All", "Rented", "In Store"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatusFilter(s);
                      setShowFilterDropdown(false);
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      statusFilter === s ? "font-bold" : ""
                    }`}
                  >
                    {s === "All" ? "All Statuses" : s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            <SlidersHorizontal size={16} />
            Sort By
          </button>

          <button 
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Items
          </button>
        </div>

        {/* Items List */}
        <div className="px-4">
          {paginated.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <p className="text-base font-bold text-foreground">{item.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Category – {item.category}</span>
                  {item.serialNumber && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span>SN: {item.serialNumber}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Status Badge */}
                {item.status === "Rented" ? (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                    Rented
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-border text-foreground text-xs font-semibold">
                    <Check size={14} className="text-green-500" />
                    In Store
                  </span>
                )}

                {/* Edit button */}
                <button
                  onClick={() => handleEdit(item)}
                  className="w-9 h-9 flex items-center justify-center bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity"
                  title="Edit item"
                >
                  <Pencil size={14} />
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-opacity"
                  title="Delete item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {paginated.length === 0 && (
            <p className="text-center py-12 text-muted-foreground text-sm">
              No items found.
            </p>
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
                    currentPage === p
                      ? "bg-foreground text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ) : (
                <span key={i} className="px-1 text-muted-foreground">
                  {p}
                </span>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
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

      <InventoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editItem={selectedItem}
      />
    </AppLayout>
  );
};

export default AdminPage;
