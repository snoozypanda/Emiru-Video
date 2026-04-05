import { useLocation, useNavigate } from "react-router-dom";
import { Users, User, CalendarDays, Camera, Settings, FileText, CheckSquare, RotateCcw, UserCog, History, LogOut } from "lucide-react";
import logoWhite from "@/assets/emiru-logo-white.png";

const navItems = [
  { label: "Booking", icon: CheckSquare, path: "/booking" },
  { label: "Return", icon: RotateCcw, path: "/return" },
  { label: "Scheduled", icon: CalendarDays, path: "/scheduled" },
  { label: "Product", icon: Camera, path: "/product" },
  { label: "Members", icon: User, path: "/" },
  { label: "Admin", icon: UserCog, path: "/admin" },
  { label: "History", icon: History, path: "/history" },
  { label: "Report", icon: FileText, path: "/report" },
  { label: "Setting", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[250px] bg-emiru-black flex flex-col z-50 overflow-hidden">
      {/* Logo */}
      <div className="px-5 pt-5 pb-8">
        <img src={logoWhite} alt="Emiru Video" className="h-10 object-contain" />
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                isActive
                  ? "bg-emiru-yellow text-emiru-black"
                  : "text-emiru-white hover:bg-emiru-white/10"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logo watermark */}
      <div className="absolute bottom-12 left-0 w-[200px] opacity-[0.03] pointer-events-none overflow-hidden">
        <h1 className="text-8xl font-heading font-bold text-white -rotate-6 transform -translate-x-[20%] translate-y-[20%]">Trident</h1>
      </div>

      {/* Logout Button */}
      <div className="px-5 py-5 pb-8 relative z-10 w-full mt-auto">
        <button
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2 bg-white rounded-lg py-2.5 text-emiru-red font-medium transition-colors hover:bg-gray-100"
        >
          <span>Logout</span>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
