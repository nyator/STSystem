import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { LuTicketSlash, LuMessagesSquare } from 'react-icons/lu'
import { FormInput, FormTextArea, FormCommentArea } from '../ui/Input'
import TicketModal from './TicketModal'
import useTicket from '../../Hooks/Tickets/useTicket'
import useEditTicket from '../../Hooks/Tickets/useEditTicket'
import useMembers from '../../Hooks/Team/useMembers'
import { useAuth } from '../../Hooks/useAuth'
import CommentList from './CommentList'
import MemberPill from '../ui/MemberPill'

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
      { ticketId, comments: updatedComments },
      { onSuccess: () => reset() },
    );
  };

  return (
    <TicketModal
      isOpen={!!ticketId}
      onClose={onClose}
      TitleIcon={<LuTicketSlash className="mr-2" />}
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

      {/* Assignedto  */}
      <div className="flex gap-2 items-center text-xs mb-2">
        {/* <p className="mb-1">AssignedTo:</p> */}
        {members
          ?.filter((member) => ticket?.assignedTo === member.id)
          .map((member) => <MemberPill key={member.id} member={member} />)}
      </div>

      <div className="w-full">
        <form
          id="add-comment-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FormInput
            name="title"
            placeholder="Ticket Title"
            register={register}
            formfields={{}}
            error={errors.title}
            readOnly
          />
          <FormInput
            name="email"
            placeholder="Customer email"
            register={register}
            formfields={{}}
            error={errors.email}
            readOnly
          />
          <FormTextArea
            name="description"
            placeholder="Ticket Description"
            register={register}
            formfields={{}}
            error={errors.description}
            readOnly
          />

          <CommentList comments={ticket?.comments} maxHeightClass="max-h-20" />

          {/* Comment input */}
          <FormCommentArea
            name="comment"
            placeholder="Write a comment..."
            register={register}
          />
        </form>
      </div>
    </TicketModal>
  );
}
