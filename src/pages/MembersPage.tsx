import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AddClientModal from "@/components/AddClientModal";
import { Search, SlidersHorizontal, Plus, Pencil, ChevronLeft, ChevronRight, ChevronDown, Phone } from "lucide-react";
import { Client, MOCK_CLIENTS } from "@/lib/types";

const MembersPage = () => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  const handleAdd = () => {
    setEditClient(null);
    setModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setEditClient(client);
    setModalOpen(true);
  };

  const handleDelete = (client: Client) => {
    if (window.confirm(`Delete ${client.full_name}?`)) {
      setClients(clients.filter((c) => c.id !== client.id));
    }
  };

  const handleSave = (data: Partial<Client>) => {
    if (editClient) {
      setClients(clients.map((c) => (c.id === editClient.id ? { ...c, ...data } as Client : c)));
    } else {
      const newClient: Client = {
        ...data,
        id: String(Date.now()),
        created_at: new Date().toISOString(),
      } as Client;
      setClients([newClient, ...clients]);
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-3 p-4 bg-white rounded-t-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-11 pr-4 py-2.5 bg-[#f4f4f4] rounded-md text-sm font-body outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-[#f4f4f4] rounded-md text-sm font-medium transition-colors">
          All Statuses
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f4f4f4] rounded-md text-sm font-medium transition-colors">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          Sort By
        </button>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="flex flex-col">
        {clients.slice(0, 8).map((client, i) => {
          const badgeType = ["Standard", "VIP", "Family", "Trusted"][i % 4];
          const badgeColors = {
            "Standard": "bg-purple-900",
            "VIP": "bg-red-800",
            "Family": "bg-green-700",
            "Trusted": "bg-yellow-600"
          }[badgeType];

          const isReturned = i % 3 === 2;

          return (
            <div key={client.id} className="flex items-center justify-between py-4 px-4 border-b border-border/50 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h3 className="font-bold text-base leading-tight">{client.full_name}</h3>
                  {client.guarantor_name && (
                    <span className="text-[10px] text-muted-foreground font-medium">
                      Guarantor: {client.guarantor_name} {client.guarantor_phone ? `(${client.guarantor_phone})` : ""}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold text-white shadow-sm h-fit ${badgeColors}`}>
                  {badgeType}
                </span>
              </div>
              
              <div className="flex items-center gap-3 md:gap-6">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emiru-black text-white rounded-md text-xs font-semibold hover:opacity-80 transition-opacity">
                  <Phone size={12} className="text-green-500" />
                  Call
                </button>

                <button 
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-md border text-xs font-medium w-[100px] shadow-sm ${
                    !isReturned ? "bg-emiru-black text-white border-emiru-black" : "bg-white text-emiru-black border-emiru-black"
                  }`}
                >
                  {!isReturned ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emiru-red" />
                  ) : (
                    <span className="text-green-500 font-bold">✓</span>
                  )}
                  {!isReturned ? "On Rent" : "Returned"}
                </button>
                
                <button 
                  onClick={() => handleEdit(client)}
                  className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-md shadow-sm hover:opacity-80 transition-opacity"
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-1 py-6 mt-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors bg-foreground text-background">1</button>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors hover:bg-muted">2</button>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors hover:bg-muted">3</button>
        <span className="px-1 text-muted-foreground">...</span>
        <button className="w-8 h-8 rounded-lg text-sm font-medium transition-colors hover:bg-muted">24</button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      <AddClientModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editClient={editClient}
      />
    </AppLayout>
  );
};

export default MembersPage;
