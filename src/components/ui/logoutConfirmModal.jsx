import TicketModal from "../ticket/TicketModal";

function LogoutConfirmModal({ onCancel, isOpen, submit }) {
  return (
    <>
      <TicketModal
        size="sm"
        isOpen={isOpen}
        onClose={onCancel}
        title="Confirm Logout"
        LAction="Cancel"
        RAction="Logout"
        RVariant="danger"
        submit={submit}
      >
        <p className="text-center">
          Are you sure you want to logout the current user?
        </p>
      </TicketModal>
    </>
  );
}

export default LogoutConfirmModal;
