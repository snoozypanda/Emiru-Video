import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientTable from "@/components/ClientTable";
import AddClientModal from "@/components/AddClientModal";
import { Client, MOCK_CLIENTS } from "@/lib/types";

const BookingPage = () => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  const handleSave = (data: Partial<Client>) => {
    if (editClient) {
      setClients(clients.map((client) => (client.id === editClient.id ? { ...client, ...data } as Client : client)));
      return;
    }

    const newClient: Client = {
      ...(data as Client),
      id: `book-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    setClients([newClient, ...clients]);
  };

  return (
    <AppLayout>
      <ClientTable
        clients={clients}
        onAdd={() => {
          setEditClient(null);
          setModalOpen(true);
        }}
        onEdit={(client) => {
          setEditClient(client);
          setModalOpen(true);
        }}
        onDelete={(client) => {
          if (window.confirm(`Delete ${client.full_name}?`)) {
            setClients(clients.filter((current) => current.id !== client.id));
          }
        }}
        onStatusChange={(client, status) => {
          setClients(clients.map((current) => (current.id === client.id ? { ...current, status } : current)));
        }}
        addButtonLabel="Add Clients"
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

export default BookingPage;
