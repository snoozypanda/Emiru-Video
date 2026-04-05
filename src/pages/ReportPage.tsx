import AppLayout from "@/components/layout/AppLayout";
import { DollarSign, ShoppingCart, Receipt, Calendar } from "lucide-react";

const ReportPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        
        {/* Filter Section */}
        <div className="bg-emiru-black rounded-xl p-5 w-full">
          <p className="text-white/60 text-sm mb-4">Filter by Date Range</p>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-4 py-2 bg-emiru-yellow text-emiru-black rounded-md text-sm font-semibold">
                Last 7 Days
              </button>
              <button className="px-4 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors">
                Last 30 Days
              </button>
              <button className="px-4 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors">
                Last 6 Months
              </button>
              <button className="px-4 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors">
                Last Year
              </button>
              
              <div className="flex items-center gap-2 ml-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value="Jul 26, 2026" 
                    readOnly
                    className="pl-3 pr-8 py-2 bg-white rounded-md text-sm w-[130px] outline-none text-emiru-black font-medium"
                  />
                </div>
                <span className="text-white/60 text-sm">to</span>
                <div className="relative">
                  <input 
                    type="text" 
                    value="Aug 2, 2026" 
                    readOnly
                    className="pl-3 pr-8 py-2 bg-white rounded-md text-sm w-[130px] outline-none text-emiru-black font-medium"
                  />
                </div>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-emiru-red text-white font-semibold rounded-md hover:bg-emiru-red/90 transition-colors shrink-0">
              Generate Report
            </button>
          </div>
        </div>

        {/* Dashboard Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-emiru-black rounded-xl p-6 relative overflow-hidden flex gap-5 items-center">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <DollarSign className="text-green-400" size={28} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col w-full z-10">
              <p className="text-white/80 text-sm mb-1 font-medium">Total Revenue</p>
              <p className="text-4xl font-bold text-green-400">$185140.00</p>
            </div>
            {/* Abstract icon decoration */}
            <div className="absolute top-4 right-1/4 opacity-20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon></svg>
            </div>
          </div>

          <div className="bg-emiru-black rounded-xl p-6 flex gap-5 items-center">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <ShoppingCart className="text-blue-400" size={26} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <p className="text-white/80 text-sm mb-1 font-medium">Total Rentals</p>
              <p className="text-4xl font-bold text-white">9</p>
            </div>
          </div>

          <div className="bg-emiru-black rounded-xl p-6 flex gap-5 items-center">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <Receipt className="text-teal-400" size={26} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <p className="text-white/80 text-sm mb-1 font-medium">Avg. Revenue/Rental</p>
              <p className="text-4xl font-bold text-green-400">$20571.11</p>
            </div>
          </div>

        </div>
        
      </div>
    </AppLayout>
  );
};

export default ReportPage;
