import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import {
  LuSquarePen,
  LuTicketSlash,
  LuCalendarDays,
  LuMail,
  LuFlag,
  LuTags,
  LuBuilding2,
  LuCalendarClock,
} from "react-icons/lu";
import { RxLightningBolt } from "react-icons/rx";

import { OptionButton } from "../ui/Button";
import NewTicketModal from "./NewTicketModal";
import useTicket from "../../Hooks/Tickets/useTicket";
import useEditTicket from "../../Hooks/Tickets/useEditTicket";
import useMembers from "../../Hooks/Team/useMembers";
import { formatLabel, getAvailableTransitions, getTicketSlaState } from "../../utils/TicketUtil";
import CommentList from "./CommentList";
import TicketAssigneeRow from "./TicketAssigneeRow";
import TicketDetailsFields from "./TicketDetailsFields";
import ActivityTimeline from "./ActivityTimeline";

const PRIORITY_OPTIONS = ["low", "medium", "high"];

export default function EditTicketModal({ ticketId, onClose }) {
  const { ticket } = useTicket(ticketId);
  const { data: members } = useMembers();
  const { isLoading: isUpdating } = useEditTicket();

  const [openDropdown, setOpenDropdown] = useState(null);

  const {
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
  const slaState = getTicketSlaState(ticket);

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
    <NewTicketModal
      size="lg"
      isOpen={!!ticketId}
      onClose={onClose}
      // titleID={ticketId}
      TitleIcon={<LuTicketSlash />}
      LAction="Close"
      RIcon={
        <LuSquarePen
          size={16}
          className="inline mr-2 group-hover:animate-wiggle"
        />
      }
      ticketTitle={ticket.title}
      // submit={handleSubmit(onSubmit)}
      disabled={isUpdating}
      error={hasErrors}
    >
      <DevTool control={control} />
      <div className="space-y-2">
        <div className="space-x-3 text-xs flex items-start justify-start divide-x divide-gray-200 dark:divide-gray-600">
          <div className="space-y-3 pr-2">
            <TicketAssigneeRow
              members={members}
              assignedTo={ticket?.assignedTo}
            />

            <p>
              <LuMail size={12} className="inline mb-0.5 mr-1" />
              Customer:{" "}
              <span className="font-semibold">
                {ticket?.customerName || ticket?.customerEmail || "N/A"}
              </span>
            </p>
            {ticket?.company && (
              <p>
                <LuBuilding2 size={12} className="inline mb-0.5 mr-1" />
                Company: <span className="font-semibold">{ticket.company}</span>
              </p>
            )}
            <p className="text-xs">
              <LuCalendarDays size={12} className="inline mb-0.5 mr-1" />
              Created:{" "}
              <span className="font-semibold">
                {ticket?.createdAt
                  ? new Date(ticket.createdAt).toUTCString().slice(5, -13)
                  : ""}
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <RxLightningBolt size={12} className="inline mb-0.5 mr-1" />
              Priority:{" "}
              <span className="font-semibold">{formatLabel(ticket?.priority) || "N/A"}</span>
            </p>

            <p>
              <LuFlag size={12} className="inline mb-0.5 mr-1" />
              Status:{" "}
              <span className="font-semibold">{formatLabel(ticket?.status) || "N/A"}</span>
            </p>
            <p>
              <LuTags size={12} className="inline mb-0.5 mr-1" />
              Category: <span className="font-semibold">{formatLabel(ticket?.category || "general")}</span>
            </p>
            <p>
              <LuCalendarClock size={12} className="inline mb-0.5 mr-1" />
              SLA:{" "}
              <span className={`font-semibold ${slaState === "overdue" ? "text-red-500" : slaState === "due-soon" ? "text-yellow-500" : ""}`}>
                {ticket?.dueAt ? new Date(ticket.dueAt).toUTCString().slice(5, -7) : "N/A"}
              </span>
            </p>

            {ticket?.updatedAt && (
              <p className="text-xs">
                {" "}
                <LuCalendarDays size={12} className="inline mb-0.5 mr-1" />
                Updated:{" "}
                <span className="font-semibold">
                  {ticket?.updatedAt
                    ? new Date(ticket.updatedAt).toUTCString().slice(5, -7)
                    : ""}
                </span>
              </p>
            )}

          </div>
        </div>

        <div className="space-y-6 mt-4 text-xs">
          <div>
            <p className="font-semibold">Description</p>
            <p>{ticket.description}</p>
          </div>
          {ticket?.tags?.length > 0 && (
            <div>
              <p className="font-semibold">Tags</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {ticket.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-semibold">Comments</p>
            <CommentList
              comments={ticket?.comments}
              maxHeightClass="max-h-2xl"
            />
          </div>

          <div>
            <p className="font-semibold">Activity</p>
            <ActivityTimeline activity={ticket?.activity} />
          </div>
        </div>

        <form id="edit-ticket-form" className="space-y-3">
          {/* <TicketDetailsFields register={register} errors={errors} showEmail /> */}
          {/* <CommentList comments={ticket?.comments} /> */}

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
    </NewTicketModal>
  );
}
