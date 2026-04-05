import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Camera,
  CheckSquare,
  Clock,
  FileText,
  LogOut,
  RotateCcw,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import logoWhite from "@/assets/emiru-logo-white.png";

const navItems = [
  { label: "Booking", icon: CheckSquare, path: "/" },
  { label: "Return", icon: RotateCcw, path: "/return" },
  { label: "Scheduled", icon: CalendarDays, path: "/scheduled" },
  { label: "Product", icon: Camera, path: "/product" },
  { label: "Members", icon: Users, path: "/members" },
  { label: "Admin", icon: ShieldCheck, path: "/admin" },
  { label: "History", icon: Clock, path: "/history" },
  { label: "Report", icon: FileText, path: "/report" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 flex w-[200px] flex-col overflow-hidden bg-emiru-black">
      <div className="px-5 pt-5 pb-6">
        <img src={logoWhite} alt="Emiru Video" className="h-10 w-auto object-contain object-left" />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emiru-yellow text-emiru-black shadow-lg"
                  : "text-emiru-white/80 hover:bg-emiru-white/10 hover:text-emiru-white"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pointer-events-none absolute bottom-10 left-0 w-[200px] opacity-[0.04]">
        <h1 className="translate-x-[-15%] translate-y-[10%] rotate-[-8deg] text-7xl font-heading font-bold text-white">
          EMIRU
        </h1>
      </div>

      <div className="relative z-10 px-3 pb-5">
        <button
          onClick={() => navigate("/login")}
          data-testid="nav-logout"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium text-emiru-red transition-all duration-200 hover:bg-emiru-red/10"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
