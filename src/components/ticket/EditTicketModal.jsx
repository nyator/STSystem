import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { LuSquarePen, LuMail, LuTicketSlash } from "react-icons/lu";
import { FormInput, FormTextArea } from "../ui/Input";
import { OptionButton } from "../ui/Button";
import TicketModal from "./TicketModal";
import useTicket from "../../Hooks/Tickets/useTicket";
import useEditTicket from "../../Hooks/Tickets/useEditTicket";
import useMembers from "../../Hooks/Team/useMembers";
import { getAvailableTransitions } from "../../utils/TicketUtil";
import CommentList from "./CommentList";
import MemberPill from "../ui/MemberPill";

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
      TitleIcon={<LuTicketSlash className="mr-2" />}
      // LAction="close"
      // RAction="Update Ticket"
      // RAction="Add comment"
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
      <div className="w-full">
        <div className="text-xs mb-2.5">
          <div className="flex justify-between">
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

        {/* Assignedto  */}
        <div className="flex gap-2 items-center text-xs my-2">
          {/* <p>AssignedTo:</p> */}
          {members
            ?.filter((member) => ticket?.assignedTo === member.id)
            .map((member) => <MemberPill key={member.id} member={member} />)}
        </div>

        <form id="edit-ticket-form" className="space-y-2">
          <FormInput
            name="title"
            placeholder="Enter Ticket Title"
            register={register}
            formfields={{ required: "Title is required" }}
            error={errors.title}
            readOnly
          />
          <FormInput
            name="email"
            placeholder="Enter customer email"
            icon={
              <LuMail
                className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            error={errors.email}
            readOnly
          />
          <FormTextArea
            name="description"
            placeholder="Enter Ticket Description"
            register={register}
            formfields={{ required: "Description is required" }}
            error={errors.description}
            readOnly
          />

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
