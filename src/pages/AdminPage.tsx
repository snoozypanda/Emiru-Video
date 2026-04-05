import AppLayout from "@/components/layout/AppLayout";
import { Search, SlidersHorizontal, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/types";

const AdminPage = () => {
  return (
    <AppLayout>
      <div className="flex items-center gap-3 p-4 bg-white rounded-t-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-11 pr-4 py-2.5 bg-[#f4f4f4] rounded-md text-sm font-body outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-[#f4f4f4] rounded-md text-sm font-medium transition-colors">
          All Statuses
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f4f4f4] rounded-md text-sm font-medium transition-colors">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          Sort By
        </button>
        <button className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} />
          Add Items
        </button>
      </div>

      <div className="flex flex-col">
        {MOCK_PRODUCTS.slice(0, 8).map((product, i) => (
          <div key={product.id} className="flex items-center justify-between py-4 px-4 border-b border-border/50 hover:bg-gray-50">
            <div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-xs text-muted-foreground">Category - Camera</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-md border text-xs font-medium w-[100px] ${
                  i % 2 === 0 ? "bg-emiru-black text-white border-emiru-black" : "bg-white text-emiru-black border-emiru-black"
                }`}
              >
                {i % 2 === 0 ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emiru-red" />
                ) : (
                  <span className="text-green-500 font-bold">✓</span>
                )}
                {i % 2 === 0 ? "Rented" : "In Store"}
              </button>
              
              <button className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-md hover:opacity-80 transition-opacity">
                <Pencil size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 py-6 mt-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors bg-foreground text-background">1</button>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors hover:bg-muted">2</button>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors hover:bg-muted">3</button>
        <span className="px-1 text-muted-foreground">...</span>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors hover:bg-muted">24</button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
