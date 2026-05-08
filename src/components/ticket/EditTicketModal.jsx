import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { LuSquarePen, LuMail, LuTicketSlash } from "react-icons/lu";
import { FormInput, FormTextArea } from "../ui/Input";
import Button, { OptionButton } from "../ui/Button";
import TicketModal from "./TicketModal";
import useTicket from "../../Hooks/Tickets/useTicket";
import useEditTicket from "../../Hooks/Tickets/useEditTicket";
import useMembers from "../../Hooks/Team/useMembers";
import CustomInfoToast from "../ui/CustomInfoToast";
import { getAvailableTransitions } from "../../utils/TicketUtil";

const PRIORITY_OPTIONS = ["low", "medium", "high"];

export default function EditTicketModal({ ticketId, onClose }) {
  const { ticket } = useTicket(ticketId);
  const { data: members } = useMembers();
  const { updateTicket, isLoading: isUpdating } = useEditTicket();

  const [selectedPriority, setSelectedPriority] = useState("low");
  const [selectedStatus, setSelectedStatus] = useState("open");
  const [openDropdown, setOpenDropdown] = useState(null);

  const {
    register,
    handleSubmit,
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
      setSelectedPriority(ticket.priority || "low");
      setSelectedStatus(ticket.status || "open");
    }
  }, [ticket, reset]);

  const handlePriorityChange = (value) => {
    setSelectedPriority(value);
    setValue("priority", value, { shouldDirty: true });
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
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
            ?.filter((m) => ticket?.assignedTo === m.id)
            .map((m) => (
              <div
                key={m.id}
                className="flex w-fit items-center pl-1 pr-2 py-1 rounded-full bg-gray-50 dark:bg-blue-900/50 border border-gray-200 dark:border-blue-700 text-gray-700 dark:text-blue-300 text-xs font-medium"
              >
                <img
                  src={m.avatar}
                  alt={`${m.firstName} ${m.lastName}`}
                  className="w-5 h-5 rounded-full mr-1"
                />
                {m.firstName} {m.lastName}
              </div>
            ))}
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

          {/* Comments list */}
          <div className="flex flex-col gap-1 rounded-lg bg-blue-50 dark:bg-gray-700/30 p-2 overflow-y-auto scroll-auto">
            {ticket?.comments?.length > 0 && (
              <p className=" text-xs">comments</p>
            )}
            <div className="max-h-40 overflow-y-auto">
              {ticket?.comments?.length > 0 ? (
                ticket.comments
                  .slice()
                  .reverse()
                  .map((comment, i) => (
                    <div
                      key={i}
                      className="bg-white leading-2.75 border border-dashed border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 rounded-md py-1 px-1.5 w-full min-h-5.5 flex flex-col gap-1 overflow-auto"
                    >
                      <p className="font-black text-[10px] text-blue-700">
                        @{comment.author}
                      </p>
                      <div className="border-l border-gray-300 dark:border-gray-500 px-1 w-full h-full flex flex-col gap-0.5 text-[12px]">
                        <p className="text-[11px] font-medium">
                          {comment.message}
                        </p>
                        <p className="text-[9px] text-black/40 dark:text-gray-100">
                          {comment.createdAt
                            ? new Date(comment.createdAt)
                                .toUTCString()
                                .slice(0, -7)
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-xs text-gray-400 text-center">
                  No comments yet
                </p>
              )}
            </div>
          </div>

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
