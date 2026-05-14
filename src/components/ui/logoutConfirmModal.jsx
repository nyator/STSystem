import TicketModal from "../ticket/TicketModal";
import Button, { OptionButton } from "./Button";
import { FormInputEmpty } from "./Input";
import { LuTrash2 } from "react-icons/lu";

function LogoutConfirmModal({ onConfirm, onCancel, isOpen, submit }) {
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
