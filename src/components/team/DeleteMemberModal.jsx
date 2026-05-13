import useDeleteMember from "../../Hooks/Team/useDeleteMember";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";

export default function DeleteMemberModal({ MemberId, onClose }) {
  const { deleteMember, isLoading } = useDeleteMember();

  return (
    <ConfirmDeleteModal
      isOpen={!!MemberId}
      itemId={MemberId}
      itemLabel="Member"
      title="Delete Member"
      onClose={onClose}
      onConfirm={deleteMember}
      isLoading={isLoading}
      getErrorMessage={(error) => error?.message}
    />
  );
}
