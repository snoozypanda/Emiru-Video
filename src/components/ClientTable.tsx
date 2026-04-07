import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Client } from "@/lib/types";

interface ClientTableProps {
  clients: Client[];
  onAdd?: () => void;
  onEdit: (client: Client) => void;
  onDelete?: (client: Client) => void;
  onStatusChange?: (client: Client, status: Client["status"]) => void;
  showDateRange?: boolean;
  addButtonLabel?: string;
  hideDelete?: boolean;
  allowStatusChange?: boolean;
  dateHeaderLabel?: string;
  showTime?: boolean;
  showRemainingValue?: boolean;
  showPenalty?: boolean;
}

const ITEMS_PER_PAGE = 8;

const ClientTable = ({ 
  clients, 
  onAdd, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  showDateRange = false, 
  addButtonLabel = "Add Clients", 
  hideDelete = false, 
  allowStatusChange = false, 
  dateHeaderLabel,
  showTime = false,
  showRemainingValue = false,
  showPenalty = false
}: ClientTableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Done">("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setBySort] = useState<"default" | "date">("default");
  const [statusMenuClientId, setStatusMenuClientId] = useState<string | null>(null);
  const [customMode, setCustomMode] = useState(() => localStorage.getItem("emiru-custom-mode") === "true");

  useEffect(() => {
    const handleCustomModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setCustomMode(Boolean(customEvent.detail));
    };

    window.addEventListener("emiru-custom-mode-change", handleCustomModeChange as EventListener);
    return () => window.removeEventListener("emiru-custom-mode-change", handleCustomModeChange as EventListener);
  }, []);

  useEffect(() => {
    if (!customMode && !allowStatusChange) {
      setStatusMenuClientId(null);
    }
  }, [customMode, allowStatusChange]);

  const filtered = useMemo(() => {
    let result = clients.filter((c) => {
      const matchesSearch = c.full_name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone_number.includes(search);
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortBy === "date") {
      result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return result;
  }, [clients, search, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const pageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= Math.min(6, totalPages); i++) pages.push(i);
    if (totalPages > 6) {
      pages.push("—");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-card rounded-xl">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
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
              {(["All", "Active", "Done"] as const).map((s) => (
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
        <div className="relative">
          <button 
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <SlidersHorizontal size={16} />
            {sortBy === "default" ? "Sort By" : "Sorted by Day"}
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[140px]">
              <button
                onClick={() => { setBySort("default"); setShowSortDropdown(false); }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${sortBy === "default" ? "font-bold" : ""}`}
              >
                Default
              </button>
              <button
                onClick={() => { setBySort("date"); setShowSortDropdown(false); }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${sortBy === "date" ? "font-bold" : ""}`}
              >
                By Day
              </button>
            </div>
          )}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            {addButtonLabel}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="w-12 px-4 py-3">
                <input type="checkbox" aria-label="Select all clients" title="Select all clients" className="w-4 h-4 rounded border-border" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Company/ Name <ChevronDown size={12} className="inline ml-1" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Phone No <ChevronDown size={12} className="inline ml-1" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                {(sortBy === "date" && dateHeaderLabel) ? dateHeaderLabel : "Date"} <ChevronDown size={12} className="inline ml-1" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                {showRemainingValue ? "Remaining" : "Paid/ Remain"} <ChevronDown size={12} className="inline ml-1" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Status <ChevronDown size={12} className="inline ml-1" />
              </th>
              {showPenalty && (
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                  Penalty <ChevronDown size={12} className="inline ml-1" />
                </th>
              )}
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((client) => (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3.5">
                  <input type="checkbox" aria-label={`Select ${client.full_name}`} title={`Select ${client.full_name}`} className="w-4 h-4 rounded border-border" />
                </td>
                <td className="px-4 py-3.5 text-sm">{client.full_name}</td>
                <td className="px-4 py-3.5 text-sm">{client.phone_number}</td>
                <td className="px-4 py-3.5 text-sm">
                  {(() => {
                    let displayDate = client.date;
                    if (showDateRange && client.date_end) {
                      displayDate = `${client.date} - ${client.date_end}`;
                    }
                    if (showTime && client.created_at) {
                      const timeStr = new Date(client.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <span>
                          {displayDate} <span className="text-muted-foreground ml-1">| {timeStr}</span>
                        </span>
                      );
                    }
                    return displayDate;
                  })()}
                </td>
                <td className="px-4 py-3.5 text-sm">
                  {showRemainingValue 
                    ? (
                      <div className="flex flex-col">
                        <span>{client.remain > 0 ? client.remain.toLocaleString() : "—"}</span>
                        {client.payment_method && (
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{client.payment_method}</span>
                        )}
                      </div>
                    ) 
                    : (client.paid > 0 ? client.paid.toLocaleString() : "—")}
                </td>
                <td className="px-4 py-3.5">
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() => {
                        if (!customMode && !allowStatusChange) return;
                        setStatusMenuClientId((prev) => (prev === client.id ? null : client.id));
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-medium transition-colors ${
                        customMode || allowStatusChange ? "border-border text-foreground hover:bg-muted" : "border-border text-muted-foreground cursor-not-allowed"
                      }`}
                      title={customMode || allowStatusChange ? "Change status" : "Enable Custom Mode to change status"}
                    >
                      {client.status === "Active" ? (
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                      ) : (
                        <span className="text-green-500">✓</span>
                      )}
                      {client.status}
                      <ChevronDown size={12} />
                    </button>
                    {(customMode || allowStatusChange) && statusMenuClientId === client.id && (
                      <div className="absolute left-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[120px]">
                        {(["Active", "Done"] as const).map((nextStatus) => (
                          <button
                            key={nextStatus}
                            type="button"
                            onClick={() => {
                              onStatusChange?.(client, nextStatus);
                              setStatusMenuClientId(null);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                              client.status === nextStatus ? "font-bold" : ""
                            }`}
                          >
                            {nextStatus}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                {showPenalty && (
                  <td className="px-4 py-3.5 text-sm font-bold text-emiru-red">
                    {client.penalty && client.penalty > 0 ? `${client.penalty.toLocaleString()} ETB` : "—"}
                  </td>
                )}
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(client)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background rounded-lg text-xs font-medium hover:opacity-80 transition-opacity"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    {!hideDelete && onDelete && (
                      <button
                        onClick={() => onDelete(client)}
                        title={`Delete ${client.full_name}`}
                        aria-label={`Delete ${client.full_name}`}
                        className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          {pageNumbers().map((p, i) =>
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
  );
};

export default ClientTable;
