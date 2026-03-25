import AppLayout from "@/components/layout/AppLayout";
import { FileText } from "lucide-react";

const ReportPage = () => {
  return (
    <AppLayout>
      <div className="bg-card rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <FileText size={28} />
          Report
        </h1>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="p-6 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">48,500 ETB</p>
          </div>
          <div className="p-6 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Pending Amount</p>
            <p className="text-3xl font-bold text-primary">12,300 ETB</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">Detailed reports coming soon...</p>
      </div>
    </AppLayout>
  );
};

export default ReportPage;
