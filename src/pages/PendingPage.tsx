import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientTable from "@/components/ClientTable";
import AddClientModal from "@/components/AddClientModal";
import { Client, MOCK_CLIENTS } from "@/lib/types";

const PendingPage = () => {
  const pendingClients = MOCK_CLIENTS.filter((c) => c.paid === 0).map(c => ({ ...c, type: "pending" as const }));
  const [clients, setClients] = useState<Client[]>(pendingClients);
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
      />
      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editClient={editClient} />
    </AppLayout>
  );
};

export default PendingPage;
