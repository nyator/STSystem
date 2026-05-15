import {
  LuPanelRightClose,
  LuTicketSlash,
  LuCornerDownLeft,
} from "react-icons/lu";
import useTicket from "../../Hooks/Tickets/useTicket";
import useMembers from "../../Hooks/Team/useMembers";
import StatusBadge from "../ui/StatusBadge";
import PriorityBadge from "../ui/PriorityBadge";
import CommentList from "./CommentList";
import TicketAssigneeRow from "./TicketAssigneeRow";
import ActivityTimeline from "./ActivityTimeline";
import { formatLabel, getTicketSlaState } from "../../utils/TicketUtil";

import useEditTicket from "../../Hooks/Tickets/useEditTicket";
import { useAuth } from "../../Hooks/useAuth";
import { createActivity } from "../../utils/TicketUtil";
import { addNotification } from "../../utils/NotificationUtil";
import { useForm } from "react-hook-form";
import { FormCommentArea } from "../ui/Input";

function TicketDrawer({ ticketId, onClose }) {
  const { ticket } = useTicket(ticketId);
  const { updateTicket, isLoading: isSubmitting } = useEditTicket();
  const { data: members } = useMembers();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  // Handle the comment submission logic
  const onSubmit = (data) => {
    if (!data.comment?.trim()) return;

    const newComment = {
      message: data.comment.trim(),
      author: user?.name || "User",
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [
      ...(Array.isArray(ticket?.comments) ? ticket.comments : []),
      newComment,
    ];

    updateTicket(
      {
        ticketId,
        comments: updatedComments,
        actor: user,
        activity: [
          ...(ticket?.activity || []),
          createActivity({
            type: "comment",
            actor: user,
            message: "Added a comment",
          }),
        ],
      },
      { onSuccess: () => reset() },
    );
    addNotification({
      title: "New comment",
      message: `${user?.name || "Someone"} commented on ${ticketId}`,
      ticketId,
      targetUserId:
        user?.role === "assignee" ? ticket?.createdBy : ticket?.assignedTo,
      type: "comment",
    });
  };

  if (!ticketId) {
    return (
      <div className="hidden h-[calc(100vh-5.5rem)] w-80 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-400 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none xl:flex">
        <LuTicketSlash size={28} className="mb-2 opacity-50" />
        <p className="text-xs font-medium">
          Select a ticket to preview details
        </p>
      </div>
    );
  }

  if (!ticket) return null;

  const slaState = getTicketSlaState(ticket);

  return (
    <aside className="hidden h-[calc(100vh-5.5rem)] w-88 shrink-0 flex-col rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none xl:flex">
      <div className="mb-3 flex items-start justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-700">
        <div className="min-w-0">
          <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase text-gray-400">
            <LuTicketSlash size={13} />
            {ticket.id}
          </p>
          <h2 className="line-clamp-2 text-sm font-bold text-gray-900 dark:text-white">
            {ticket.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-200 bg-white p-2 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close ticket preview"
        >
          <LuPanelRightClose size={15} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        <div className="flex flex-wrap gap-2 p-0.5">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={formatLabel(ticket.status).toLowerCase()} />
          {slaState !== "none" && (
            <span
              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${slaState === "overdue" ? "bg-red-50 text-red-600" : slaState === "due-soon" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"}`}
            >
              {formatLabel(slaState)}
            </span>
          )}
          <span className="rounded-md bg-gray-50 px-2 py-1 text-[10px] font-semibold uppercase text-gray-500 dark:bg-gray-700 dark:text-gray-300">
            {formatLabel(ticket.category || "general")}
          </span>
        </div>

        <TicketAssigneeRow members={members} assignedTo={ticket.assignedTo} />

        <section>
          <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
            Customer
          </p>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            {ticket.customerName || ticket.customerEmail || "N/A"}
          </p>
        </section>

        <section>
          <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
            Description
          </p>
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
            {ticket.description || "No description"}
          </p>
        </section>

        <section>
          <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
            Comments
          </p>

          <div>
            <CommentList comments={ticket.comments} maxHeightClass="max-h-36" />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-2">
              <FormCommentArea
                name="comment"
                placeholder="Write a comment..."
                register={register}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  <span>Comment</span>
                  <LuCornerDownLeft size={12} className="opacity-80" />
                </button>
              </div>
            </form>
          </div>
        </section>

        <section>
          <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">
            Activity
          </p>
          <ActivityTimeline activity={ticket.activity} />
        </section>
      </div>
    </aside>
  );
}

export default TicketDrawer;
