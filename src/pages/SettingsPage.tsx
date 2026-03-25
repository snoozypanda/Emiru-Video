import AppLayout from "@/components/layout/AppLayout";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="bg-card rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Settings size={28} />
          Settings
        </h1>
        <div className="space-y-6 max-w-xl">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Company Name</label>
            <input type="text" defaultValue="Emiru Video" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Default Currency</label>
            <input type="text" defaultValue="ETB" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Contact Email</label>
            <input type="email" defaultValue="info@emiruvideo.com" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none" />
          </div>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
            Save Settings
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
