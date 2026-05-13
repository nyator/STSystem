import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { LuSquarePen, LuTicketSlash } from "react-icons/lu";
import { OptionButton } from "../ui/Button";
import TicketModal from "./TicketModal";
import useTicket from "../../Hooks/Tickets/useTicket";
import useEditTicket from "../../Hooks/Tickets/useEditTicket";
import useMembers from "../../Hooks/Team/useMembers";
import { getAvailableTransitions } from "../../utils/TicketUtil";
import CommentList from "./CommentList";
import TicketAssigneeRow from "./TicketAssigneeRow";
import TicketDetailsFields from "./TicketDetailsFields";

const PRIORITY_OPTIONS = ["low", "medium", "high"];

export default function EditTicketModal({ ticketId, onClose }) {
  const { ticket } = useTicket(ticketId);
  const { data: members } = useMembers();
  const { isLoading: isUpdating } = useEditTicket();

  const [openDropdown, setOpenDropdown] = useState(null);

  const {
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      email: "",
      description: "",
      priority: "low",
      status: "open",
    },
  });

  const selectedPriority = useWatch({
    control,
    name: "priority",
    defaultValue: "low",
  });
  const selectedStatus = useWatch({
    control,
    name: "status",
    defaultValue: "open",
  });

  const hasErrors = Object.keys(errors).length > 0;

  const priorityOptions = PRIORITY_OPTIONS.map((value) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
    onClick: () => handlePriorityChange(value),
  }));

  const statusOptions = [
    ...(ticket?.status
      ? [{ label: `${ticket.status}`, value: ticket.status, disabled: true }]
      : []),
    ...getAvailableTransitions(ticket?.status).map((value) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1),
      value,
      onClick: () => handleStatusChange(value),
    })),
  ];

  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title || "",
        email: ticket.customerEmail || "",
        description: ticket.description || "",
        priority: ticket.priority || "low",
        status: ticket.status || "open",
      });
    }
  }, [ticket, reset]);

  const handlePriorityChange = (value) => {
    setValue("priority", value, { shouldDirty: true });
  };

  const handleStatusChange = (value) => {
    setValue("status", value, { shouldDirty: true });
  };

  // const onSubmit = (data) => {
  //     if (!isDirty) {
  //         onClose()
  //         CustomInfoToast()
  //         return
  //     }

  //     updateTicket(
  //         {
  //             ticketId,
  //             title: data.title,
  //             email: data.email,
  //             description: data.description,
  //             priority: data.priority,
  //             status: data.status,
  //         },
  //         {
  //             onSuccess: () => onClose(),
  //         }
  //     )
  // }

  return (
    <TicketModal
      isOpen={!!ticketId}
      onClose={onClose}
      title="View Ticket"
      TitleIcon={<LuTicketSlash />}
      LAction="Close"
      RIcon={
        <LuSquarePen
          size={16}
          className="inline mr-2 group-hover:animate-wiggle"
        />
      }
      ticketId={ticketId}
      // submit={handleSubmit(onSubmit)}
      disabled={isUpdating}
      error={hasErrors}
    >
      <DevTool control={control} />
      <div className="space-y-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs dark:border-gray-700 dark:bg-gray-700/30">
          <div className="flex justify-between gap-3">
            <p>
              Created:{" "}
              <span className="font-semibold">
                {ticket?.createdAt
                  ? new Date(ticket.createdAt).toUTCString().slice(5, -13)
                  : ""}
                {/* {ticket?.createdAt
                  ? new Date(ticket.createdAt).toLocaleDateString()
                  : ""} */}
              </span>
            </p>
            <p>
              Updated:{" "}
              <span className="font-semibold">
                {ticket?.updatedAt
                  ? new Date(ticket.updatedAt).toUTCString().slice(5, -7)
                  : ""}
                {/* {ticket?.updatedAt
                  ? new Date(ticket.updatedAt).toLocaleDateString()
                  : ""} */}
              </span>
            </p>
          </div>
        </div>

        <TicketAssigneeRow members={members} assignedTo={ticket?.assignedTo} />

        <form id="edit-ticket-form" className="space-y-3">
          <TicketDetailsFields register={register} errors={errors} showEmail />
          <CommentList comments={ticket?.comments} />

          <div className="flex flex-wrap space-x-2 justify-center">
            <OptionButton
              title="Priority"
              options={priorityOptions}
              selected={selectedPriority}
              isOpen={openDropdown === "priority"}
              setIsOpen={(open) => setOpenDropdown(open ? "priority" : null)}
              disabled
            />
            <OptionButton
              title="Status"
              options={statusOptions}
              selected={selectedStatus}
              isOpen={openDropdown === "status"}
              setIsOpen={(open) => setOpenDropdown(open ? "status" : null)}
              disabled
            />
          </div>
        </form>
      </div>
    </TicketModal>
  );
}
