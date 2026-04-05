import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientTable from "@/components/ClientTable";
import AddClientModal from "@/components/AddClientModal";
import { Client, MOCK_CLIENTS } from "@/lib/types";

const ReturnPage = () => {
  const returnClients = MOCK_CLIENTS.filter((c) => c.status === "Done").length > 0
    ? MOCK_CLIENTS.filter((c) => c.status === "Done")
    : MOCK_CLIENTS.slice(0, 4).map((c) => ({ ...c, status: "Done" as const }));

  const [clients, setClients] = useState<Client[]>(returnClients);
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
        addButtonLabel="Add Clients"
      />
      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editClient={editClient} />
    </AppLayout>
  );
};

export default ReturnPage;
