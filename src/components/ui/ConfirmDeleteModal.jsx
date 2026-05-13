import { DevTool } from "@hookform/devtools";
import { useForm, useWatch } from "react-hook-form";
import { LuTrash2 } from "react-icons/lu";

import TicketModal from "../ticket/TicketModal";
import { FormInputEmpty } from "./Input";

function ConfirmDeleteModal({
  isOpen,
  itemId,
  itemLabel = "item",
  title = "Confirm Delete",
  onClose,
  onConfirm,
  isLoading,
  getErrorMessage,
}) {
  const {
    register,
    getValues,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const confirmDeleteValue = useWatch({
    control,
    name: "confirmDelete",
    defaultValue: "",
  });

  const closeModal = () => {
    reset();
    onClose();
  };

  const handleDeleteConfirm = () => {
    const { confirmDelete } = getValues();

    if (confirmDelete !== itemId) {
      setError("confirmDelete", {
        type: "manual",
        message: `Input must match ${itemLabel} ID: ${itemId}`,
      });
      return;
    }

    onConfirm(itemId, {
      onSuccess: closeModal,
      onError: (error) => {
        setError("confirmDelete", {
          type: "manual",
          message:
            getErrorMessage?.(error) ||
            `Failed to delete ${itemLabel}. Please try again.`,
        });
      },
    });
  };

  return (
    <>
      <DevTool control={control} />
      <TicketModal
        isOpen={isOpen}
        onClose={closeModal}
        title={title}
        LAction="Cancel"
        RAction={isLoading ? "Deleting..." : "Confirm Delete"}
        RVariant="danger"
        RIcon={
          <LuTrash2
            size={16}
            className={`inline mr-2 ${
              confirmDeleteValue === itemId ? "group-hover:animate-wiggle" : ""
            }`}
          />
        }
        submit={handleDeleteConfirm}
        disabled={isLoading || confirmDeleteValue !== itemId}
      >
        <p className="text-center mb-3">
          To confirm, type <span className="font-bold">"{itemId}"</span> in the
          box below
        </p>

        <FormInputEmpty
          name="confirmDelete"
          register={register}
          formfields={{ required: "Delete input is required" }}
          error={errors.confirmDelete}
        />
      </TicketModal>
    </>
  );
}

export default ConfirmDeleteModal;
