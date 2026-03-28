import { useLocation, useNavigate } from "react-router-dom";
import { Users, Clock, CalendarDays, Camera, Settings, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import logoWhite from "@/assets/emiru-logo-white.png";

const navItems = [
  { label: "Members", icon: Users, path: "/" },
  { label: "Pending", icon: Clock, path: "/pending" },
  { label: "Scheduled", icon: CalendarDays, path: "/scheduled" },
  { label: "Product", icon: Camera, path: "/product" },
  { label: "Setting", icon: Settings, path: "/settings" },
  { label: "Report", icon: FileText, path: "/report" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customMode, setCustomMode] = useState(() => {
    return localStorage.getItem("emiru-custom-mode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("emiru-custom-mode", String(customMode));
    window.dispatchEvent(new CustomEvent("emiru-custom-mode-change", { detail: customMode }));
  }, [customMode]);

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
      <div className="absolute bottom-12 left-0 w-[200px] opacity-10 pointer-events-none">
        <img src={logoWhite} alt="" className="w-full scale-[2.5] translate-x-[-20%] translate-y-[10%]" />
      </div>

      {/* Custom Mode Toggle */}
      <div className="px-5 py-5 flex items-center gap-3 relative z-10">
        <span className="text-emiru-white text-sm font-medium">Custom Mode</span>
        <span className="text-emiru-white/60 text-xs">{customMode ? "On" : "Off"}</span>
        <button
          onClick={() => setCustomMode(!customMode)}
          title="Toggle custom mode"
          aria-label="Toggle custom mode"
          className={`relative w-12 h-6 rounded-full transition-colors ${
            customMode ? "bg-emiru-red" : "bg-emiru-white/30"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-emiru-white transition-transform ${
              customMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
