import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Clock, SlidersHorizontal, ArrowUpCircle, ArrowDownCircle, Pencil, Trash2, Plus, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { MOCK_HISTORY, HistoryEntry } from "@/lib/types";

const ITEMS_PER_PAGE = 8;

const typeIcons: Record<HistoryEntry["type"], typeof ArrowUpCircle> = {
  return: ArrowUpCircle,
  rent: ArrowDownCircle,
  edit: Pencil,
  delete: Trash2,
  add: Plus,
};

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"All" | "Day" | "Week" | "Month">("All");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // For mock filtering, we'll assume today is 1/30/2026
  const MOCK_TODAY = new Date("2026-01-30T12:00:00");

  const filteredEntries = useMemo(() => {
    if (filterType === "All") return MOCK_HISTORY;

    return MOCK_HISTORY.filter(entry => {
      // timestamp format: "1/30/2026 | 10:30AM"
      const datePart = entry.timestamp.split(" | ")[0];
      const entryDate = new Date(datePart);
      const diffTime = Math.abs(MOCK_TODAY.getTime() - entryDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (filterType === "Day") return diffDays <= 1;
      if (filterType === "Week") return diffDays <= 7;
      if (filterType === "Month") return diffDays <= 30;
      return true;
    });
  }, [filterType]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / ITEMS_PER_PAGE));
  const paginated = filteredEntries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= Math.min(6, totalPages); i++) pages.push(i);
    if (totalPages > 6) {
      pages.push("—");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages]);

  return (
    <AppLayout>
      <div className="bg-card rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Clock size={28} />
            <span>
              His<span className="text-primary">tory</span>
            </span>
          </h1>
          <div className="relative">
            <button 
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              <SlidersHorizontal size={16} />
              {filterType === "All" ? "Sort By" : `Filter: ${filterType}`}
              <ChevronDown size={14} className="ml-1 opacity-50" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[140px]">
                {(["All", "Day", "Week", "Month"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setFilterType(t); setShowSortDropdown(false); setCurrentPage(1); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${filterType === t ? "font-bold text-primary" : ""}`}
                  >
                    {t === "All" ? "Show All" : `By ${t}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* History List */}
        <div className="px-6">
          {paginated.map((entry) => {
            const IconComponent = typeIcons[entry.type] || ArrowUpCircle;
            return (
              <div
                key={entry.id}
                className="flex items-center gap-4 py-4 border-b border-border last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <IconComponent size={18} className="text-foreground" />
                </div>
                <p className="flex-1 text-sm font-medium text-foreground">
                  {entry.description}
                </p>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {entry.timestamp}
                </span>
              </div>
            );
          })}
          {paginated.length === 0 && (
            <p className="text-center py-12 text-muted-foreground text-sm">No history entries found.</p>
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
    </AppLayout>
  );
};

export default HistoryPage;
