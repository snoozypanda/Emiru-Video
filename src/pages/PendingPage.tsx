import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientTable from "@/components/ClientTable";
import AddClientModal from "@/components/AddClientModal";
import { Client, MOCK_CLIENTS } from "@/lib/types";

const PendingPage = () => {
  const pendingClients = MOCK_CLIENTS.filter(
    (c) => c.type === "pending" || (c.penalty && c.penalty > 0)
  );
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
        onEdit={(client) => {
          setEditClient(client);
          setModalOpen(true);
        }}
        onStatusChange={(client, status) => {
          setClients(clients.map((current) => (current.id === client.id ? { ...current, status } : current)));
        }}
        showPenalty={true}
        allowStatusChange={true}
        showTime={true}
        hideDelete={true}
      />
      <AddClientModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editClient={editClient}
        penaltyOnly={true}
      />
    </AppLayout>
  );
};

export default PendingPage;
