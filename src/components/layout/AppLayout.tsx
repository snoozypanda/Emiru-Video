import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-muted">
      <Sidebar />
      <TopNavbar />
      <main className="ml-[250px] mt-16 p-6 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
