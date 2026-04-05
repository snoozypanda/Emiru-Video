import AppLayout from "@/components/layout/AppLayout";
import { ArrowUp, ArrowDown, ArrowRightLeft } from "lucide-react";
import { MOCK_CLIENTS } from "@/lib/types";

const HistoryPage = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl flex items-center gap-2">
          <ArrowRightLeft size={24} /> History
        </h1>
        <button className="px-4 py-2 bg-[#f4f4f4] rounded-md text-sm font-medium">
          Sort By
        </button>
      </div>
      <div className="space-y-4">
        {MOCK_CLIENTS.slice(0, 8).map((client, i) => (
          <div key={client.id} className="flex flex-col md:flex-row items-center justify-between py-4 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                {i % 2 === 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              </div>
              <p className="text-sm">
                Item 'BLACK MAGIC' (SN: CAM-11) was returned by <span className="uppercase">{client.full_name}</span>. Cost ${client.paid || "2500.00"}.
              </p>
            </div>
            <div className="text-sm font-bold mt-2 md:mt-0">
              {client.date} | 9:00AM
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
