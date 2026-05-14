import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { LuTicketSlash, LuMessagesSquare } from 'react-icons/lu'
import { FormCommentArea } from '../ui/Input'
import useTicket from '../../Hooks/Tickets/useTicket'
import useEditTicket from '../../Hooks/Tickets/useEditTicket'
import useMembers from '../../Hooks/Team/useMembers'
import { useAuth } from '../../Hooks/useAuth'
import CommentList from './CommentList'
import TicketAssigneeRow from './TicketAssigneeRow'
import TicketDetailsFields from './TicketDetailsFields'
import NewTicketModal from './NewTicketModal'
import { createActivity } from '../../utils/TicketUtil'
import { addNotification } from '../../utils/NotificationUtil'

export default function AddCommentModal({ ticketId, onClose }) {
    const { ticket } = useTicket(ticketId)
    const { updateTicket, isLoading: isSubmitting } = useEditTicket()
    const { data: members } = useMembers()
    const { user } = useAuth()


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      email: "",
      description: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title || "",
        email: ticket.customerEmail || "",
        description: ticket.description || "",
        assignedTo: ticket.assignedTo || "",
        comments: ticket.comments,
      });
    }
  }, [ticket, reset]);

  const onSubmit = (data) => {
    if (!data.comment?.trim()) return;

        const newComment = {
            message: data.comment.trim(),
            author: user?.name || 'User',
            createdAt: new Date().toISOString(),
        }

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
      targetUserId: user?.role === "assignee" ? ticket?.createdBy : ticket?.assignedTo,
      type: "comment",
    })
  };

  return (
    <NewTicketModal
      isOpen={!!ticketId}
      onClose={onClose}
      title="Add Comment"
      TitleIcon={<LuTicketSlash />}
      LAction="Cancel"
      RAction="Add Comment"
      RIcon={
        <LuMessagesSquare
          size={16}
          className="inline mr-2 group-hover:animate-wiggle"
        />
      }
      ticketId={ticketId}
      submit={handleSubmit(onSubmit)}
      disabled={isSubmitting || !isDirty}
      error={Object.keys(errors).length > 0}
    >
      <DevTool control={control} />
      <div className="space-y-3">
        <TicketAssigneeRow members={members} assignedTo={ticket?.assignedTo} />
        <form
          id="add-comment-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <TicketDetailsFields register={register} errors={errors} showEmail />
          <CommentList comments={ticket?.comments} maxHeightClass="max-h-20" />

          <FormCommentArea
            name="comment"
            placeholder="Write a comment..."
            register={register}
          />
        </form>
      </div>
    </NewTicketModal>
  );
}
