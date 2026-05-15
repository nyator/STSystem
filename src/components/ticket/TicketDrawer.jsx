import { useState } from "react";
import {
  LuCheck,
  LuMessageSquarePlus,
  LuPanelRightClose,
  LuRefreshCcwDot,
  LuSearch,
  LuStamp,
  LuTicketSlash,
  LuCornerDownLeft,
  LuUserPlus,
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
import Button from "../ui/Button";
import useAssignTicket from "../../Hooks/Tickets/useAssignTicket";
import {
  canAddComment,
  canAssignTicket,
  canCloseTicket,
  canMarkResolved,
  canReopenTicket,
  canStartWork,
  canUpdatePriority,
} from "../../utils/AuthUtil";

function TicketDrawer({ ticketId, onClose }) {
  const { ticket } = useTicket(ticketId);
  const { updateTicket, isLoading: isSubmitting } = useEditTicket();
  const { assignTicket, isLoading: isAssigning } = useAssignTicket();
  const { data: members } = useMembers();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [assigneeSearch, setAssigneeSearch] = useState("");

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
  const allowAddComment = canAddComment(user, ticket);
  const allowAssign = canAssignTicket(user, ticket);
  const allowStartWork = canStartWork(user, ticket);
  const allowMarkResolved = canMarkResolved(user, ticket);
  const allowCloseTicket = canCloseTicket(user, ticket);
  const allowReopenTicket = canReopenTicket(user, ticket);
  const allowUpdatePriority = canUpdatePriority(user, ticket);
  const filteredMembers = (members || []).filter((member) => {
    const search = assigneeSearch.trim().toLowerCase();
    if (!search) return true;

    return [member.firstName, member.lastName, member.email, member.team].some(
      (value) =>
        String(value || "")
          .toLowerCase()
          .includes(search),
    );
  });
  const hasActions =
    allowAddComment ||
    allowAssign ||
    allowStartWork ||
    allowMarkResolved ||
    allowCloseTicket ||
    allowReopenTicket ||
    allowUpdatePriority;

  const updateStatus = (status) => {
    if (!ticket || ticket.status === status) return;
    updateTicket({ ticketId, status, actor: user });
    addNotification({
      title: "Ticket status changed",
      message: `${ticket.id} moved to ${formatLabel(status)}`,
      ticketId,
      targetUserId: ticket.createdBy,
      type: "status",
    });
  };

  const updatePriority = (priority) => {
    if (!ticket || ticket.priority === priority) return;
    updateTicket({ ticketId, priority, actor: user });
    addNotification({
      title: "Ticket priority changed",
      message: `${ticket.id} priority changed to ${priority}`,
      ticketId,
      targetUserId: ticket.assignedTo || ticket.createdBy,
      type: "priority",
    });
  };

  const openAssigneePicker = () => {
    setSelectedAssignee(ticket.assignedTo || null);
    setAssigneeSearch("");
    setShowAssigneePicker((open) => !open);
  };

  const assignSelectedMember = () => {
    if (!selectedAssignee || selectedAssignee === ticket.assignedTo) return;

    assignTicket({ ticketId, assignedTo: selectedAssignee, actor: user });
    addNotification({
      title: "Ticket assigned",
      message: `${ticket.id} was assigned to you`,
      ticketId,
      targetUserId: selectedAssignee,
      type: "assignment",
    });
    setShowAssigneePicker(false);
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-30 bg-gray-950/40 backdrop-blur-[1px] xl:hidden"
        aria-label="Close ticket drawer backdrop"
        onClick={onClose}
      />
      <aside className="fixed bottom-2 right-2 top-2 z-40 flex w-[min(92vw,24rem)] shrink-0 flex-col rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-2xl shadow-gray-950/20 dark:border-gray-800 dark:bg-gray-900 xl:static xl:z-auto xl:h-[calc(100vh-5.5rem)] xl:w-88 xl:shadow-sm xl:shadow-gray-200/60 dark:xl:shadow-none">
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

        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
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
            <div className="flex flex-wrap gap-2">
              {allowAssign && (
                <div className="pb-2">
                  <Button variant="default" onClick={openAssigneePicker}>
                    <LuUserPlus size={14} />
                    Assign
                  </Button>
                </div>
              )}
              {allowStartWork && (
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={() => updateStatus("in-progress")}
                >
                  <LuRefreshCcwDot size={14} />
                  Start Work
                </Button>
              )}
              {allowMarkResolved && (
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={() => updateStatus("resolved")}
                >
                  <LuRefreshCcwDot size={14} />
                  Resolve
                </Button>
              )}
              {allowCloseTicket && (
                <Button
                  variant="default"
                  disabled={isSubmitting}
                  onClick={() => updateStatus("closed")}
                >
                  <LuStamp size={14} />
                  Close
                </Button>
              )}
              {allowReopenTicket && (
                <Button
                  variant="default"
                  disabled={isSubmitting}
                  onClick={() => updateStatus("reopened")}
                >
                  <LuRefreshCcwDot size={14} />
                  Reopen
                </Button>
              )}
              {!hasActions && (
                <p className="text-xs text-gray-400">
                  No actions available for your role.
                </p>
              )}
            </div>

            {allowAssign && showAssigneePicker && (
              <div className="mb-2 rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950/40">
                <div className="relative mb-2">
                  <input
                    value={assigneeSearch}
                    onChange={(event) => setAssigneeSearch(event.target.value)}
                    placeholder="Search assignee..."
                    className="h-9 w-full rounded-md border border-gray-200 bg-white pl-8 pr-3 text-xs font-medium text-gray-800 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-500/20"
                  />
                  <LuSearch
                    size={14}
                    className="absolute left-2.5 top-2.5 text-gray-400"
                  />
                </div>

                <div className="max-h-56 overflow-y-auto rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setSelectedAssignee(member.id)}
                        className={`flex w-full items-center justify-between gap-3 border-b border-gray-100 px-3 py-2 text-left transition-colors last:border-b-0 dark:border-gray-800 ${
                          selectedAssignee === member.id
                            ? "bg-blue-50 dark:bg-blue-500/10"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <img
                            src={member.avatar}
                            className="h-7 w-7 rounded-full object-cover"
                            alt=""
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-gray-800 dark:text-gray-100">
                              {member.firstName} {member.lastName}
                            </span>
                            <span className="block truncate text-[10px] text-gray-400">
                              {member.team || "No team"} ·{" "}
                              {member.ticketsAssigned || 0} assigned
                            </span>
                          </span>
                        </span>
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            selectedAssignee === member.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {selectedAssignee === member.id && (
                            <LuCheck size={11} className="text-white" />
                          )}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-6 text-center text-xs text-gray-400">
                      No members found
                    </p>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAssigneePicker(false)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <Button
                    variant="primary"
                    disabled={
                      !selectedAssignee ||
                      selectedAssignee === ticket.assignedTo ||
                      isAssigning
                    }
                    onClick={assignSelectedMember}
                  >
                    <LuUserPlus size={14} />
                    Assign
                  </Button>
                </div>
              </div>
            )}

            {allowUpdatePriority && (
              <div className="flex flex-wrap gap-1.5">
                {["high", "medium", "low"].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    disabled={ticket.priority === priority || isSubmitting}
                    onClick={() => updatePriority(priority)}
                    className="rounded-full border border-gray-200 px-2.5 py-1 text-[10px] font-semibold capitalize text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:disabled:bg-gray-800"
                  >
                    {priority}
                  </button>
                ))}
              </div>
            )}
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase text-gray-400">
              Customer
            </p>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              {ticket.customerName || ticket.customerEmail || "N/A"}
            </p>
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase text-gray-400">
              Description
            </p>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              {ticket.description || "No description"}
            </p>
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase text-gray-400">
              Comments
            </p>

            <div>
              <CommentList
                comments={ticket.comments}
                maxHeightClass="max-h-36"
              />
              {allowAddComment && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-2 space-y-2"
                >
                  <FormCommentArea
                    name="comment"
                    placeholder="Write a comment..."
                    register={register}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      <span>Comment</span>
                      <LuCornerDownLeft size={12} className="opacity-80" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase text-gray-400">
              Activity
            </p>
            <ActivityTimeline activity={ticket.activity} />
          </section>
        </div>
      </aside>
    </>
  );
}

export default TicketDrawer;
