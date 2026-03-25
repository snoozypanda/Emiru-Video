import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientTable from "@/components/ClientTable";
import AddClientModal from "@/components/AddClientModal";
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
      <ClientTable
        clients={clients}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
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
