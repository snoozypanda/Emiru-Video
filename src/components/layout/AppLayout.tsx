import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-muted">
      <Sidebar />
      <TopNavbar />
      <main className="pl-[250px] pt-16 min-h-screen bg-[#f4f4f4]">
        <div className="p-6 h-full min-h-[calc(100vh-64px)]">
          <div className="bg-white rounded-xl shadow-sm min-h-[calc(100vh-112px)] p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
