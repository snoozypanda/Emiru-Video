import AppLayout from "@/components/layout/AppLayout";
import { DollarSign, ShoppingCart, FileText, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const REVENUE_DATA = [
  { name: "Mon", revenue: 12000 },
  { name: "Tue", revenue: 19000 },
  { name: "Wed", revenue: 15000 },
  { name: "Thu", revenue: 22000 },
  { name: "Fri", revenue: 30000 },
  { name: "Sat", revenue: 45000 },
  { name: "Sun", revenue: 41640 },
];

const CATEGORY_DATA = [
  { name: "Camera", count: 42, color: "#ef2d2d" },
  { name: "Lens", count: 35, color: "#333333" },
  { name: "Lighting", count: 28, color: "#666666" },
  { name: "Sound", count: 15, color: "#999999" },
  { name: "Gear", count: 12, color: "#cccccc" },
];

const ReportPage = () => {
  const [activeRange, setActiveRange] = useState("Last 7 Days");

  const ranges = ["Last 7 Days", "Last 30 Days", "Last 6 Months", "Last Year"];

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        {/* Filter Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 ml-1">
            Filter by Date Range
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-muted/30 p-1 rounded-xl border border-border/50">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeRange === range
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-2">
              <input
                type="text"
                defaultValue="Jul 26, 2025"
                className="bg-muted/50 border border-border rounded-lg px-4 py-2 text-xs font-bold w-32 outline-none focus:ring-1 focus:ring-primary/30"
              />
              <span className="text-xs font-bold text-muted-foreground">to</span>
              <input
                type="text"
                defaultValue="Aug 2, 2025"
                className="bg-muted/50 border border-border rounded-lg px-4 py-2 text-xs font-bold w-32 outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>

            <button className="ml-auto bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:opacity-90 transition-opacity uppercase tracking-wider">
              Generate Report
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Revenue" value="185,140.00" icon={DollarSign} color="text-green-500" trend="+12.5%" />
          <StatCard title="Total Rentals" value="1,248" icon={ShoppingCart} color="text-foreground" trend="+5.2%" />
          <StatCard title="Avg. Revenue/Rental" value="20,571.11" icon={FileText} color="text-primary" trend="-2.1%" prefix="$" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Area Chart */}
          <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8 px-2">
              <div>
                <h3 className="text-lg font-bold text-foreground">Revenue Growth</h3>
                <p className="text-xs text-muted-foreground">Weekly earnings performance</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef2d2d" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef2d2d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33333320" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#888" }} dy={10} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "12px", padding: "12px" }}
                    itemStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#ef2d2d" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Bar Chart */}
          <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8 px-2">
              <div>
                <h3 className="text-lg font-bold text-foreground">Top Categories</h3>
                <p className="text-xs text-muted-foreground">Rental volume by equipment type</p>
              </div>
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-foreground">
                <BarChart3 size={20} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_DATA} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: "bold", fill: "#444" }} width={80} />
                  <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: typeof DollarSign;
  color: string;
  trend: string;
  prefix?: string;
}

const StatCard = ({ title, value, icon: Icon, color, trend, prefix }: StatCardProps) => (
  <div className="bg-card rounded-[28px] border border-border p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
    <div className="flex items-start justify-between relative z-10">
      <div className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{title}</p>
        <div className="flex flex-col">
           <div className="flex items-baseline gap-1">
             {prefix && <span className={`text-xl font-extrabold ${color}`}>{prefix}</span>}
             <h2 className={`text-4xl font-extrabold tracking-tight ${color}`}>{value}</h2>
           </div>
           <p className={`text-[10px] font-bold mt-1 ml-1 ${trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
             {trend} <span className="text-muted-foreground font-medium">vs last month</span>
           </p>
        </div>
      </div>
      <div className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center border border-border shadow-inner group-hover:scale-110 transition-transform">
        <Icon size={20} className={color} />
      </div>
    </div>
    <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
      <Icon size={120} strokeWidth={1} />
    </div>
  </div>
);

export default ReportPage;
