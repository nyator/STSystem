import useDeleteTicket from "../../Hooks/Tickets/useDeleteTicket";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";

export default function DeleteTicketModal({ ticketId, onClose }) {
  const { deleteTicket, isLoading } = useDeleteTicket();

  return (
    <ConfirmDeleteModal
      isOpen={!!ticketId}
      itemId={ticketId}
      itemLabel="Ticket"
      onClose={onClose}
      onConfirm={deleteTicket}
      isLoading={isLoading}
    />
  );
}
