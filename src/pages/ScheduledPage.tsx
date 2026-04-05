import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientTable from "@/components/ClientTable";
import AddClientModal from "@/components/AddClientModal";
import { Client, MOCK_CLIENTS } from "@/lib/types";

const scheduledClients: Client[] = MOCK_CLIENTS.slice(0, 8).map((c, i) => ({
  ...c,
  id: `sched-${i}`,
  type: "scheduled" as const,
  date: "1/27/2026",
  date_end: "1/29/2026",
}));

const ScheduledPage = () => {
  const [clients, setClients] = useState<Client[]>(scheduledClients);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  const handleSave = (data: Partial<Client>) => {
    if (editClient) {
      setClients(clients.map((c) => (c.id === editClient.id ? { ...c, ...data } as Client : c)));
    } else {
      setClients([{ ...data, id: String(Date.now()), created_at: new Date().toISOString() } as Client, ...clients]);
    }
  };

  return (
    <AppLayout>
      <ClientTable
        clients={clients}
        onAdd={() => { setEditClient(null); setModalOpen(true); }}
        onEdit={(c) => { setEditClient(c); setModalOpen(true); }}
        onDelete={(c) => { if (window.confirm(`Delete ${c.full_name}?`)) setClients(clients.filter(x => x.id !== c.id)); }}
        onStatusChange={(client, status) => {
          setClients(clients.map((c) => (c.id === client.id ? { ...c, status } : c)));
        }}
        allowStatusChange
        showDateRange
        addButtonLabel="Add Clients"
        dateHeaderLabel="Due Date"
      />
      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editClient={editClient} isScheduled />
    </AppLayout>
  );
};

export default ScheduledPage;
