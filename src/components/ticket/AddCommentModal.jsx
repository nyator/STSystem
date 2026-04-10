import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { LuTicketSlash, LuMessagesSquare } from 'react-icons/lu'
import { FormInput, FormTextArea, FormCommentArea } from '../ui/Input'
import TicketModal from './TicketModal'
import useTicket from '../../Hooks/Tickets/useTicket'
import useEditTicket from '../../Hooks/Tickets/useEditTicket'
import useMembers from '../../Hooks/Team/useMembers'

export default function AddCommentModal({ ticketId, onClose }) {
    const { ticket } = useTicket(ticketId)
    const { updateTicket, isLoading: isSubmitting } = useEditTicket()
    const { data: members } = useMembers()


    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            title: '',
            email: '',
            description: '',
            comment: '',
        },
    })

    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title || '',
                email: ticket.customerEmail || '',
                description: ticket.description || '',
                assignedTo: ticket.assignedTo || '',
                comments: ticket.comments 
            })
        }
    }, [ticket, reset])



    const onSubmit = (data) => {
        if (!data.comment?.trim()) return

        const newComment = {
            message: data.comment.trim(),
            author: 'Agent',
            createdAt: new Date().toISOString(),
        }

        const updatedComments = [
            ...(Array.isArray(ticket?.comments) ? ticket.comments : []),
            newComment,
        ]

        updateTicket(
            { ticketId, comments: updatedComments },
            { onSuccess: () => reset() }
        )
    }


    return (
        <TicketModal
            isOpen={!!ticketId}
            onClose={onClose}
            TitleIcon={<LuTicketSlash className="mr-2" />}
            LAction="Cancel"
            RAction="Add Comment"
            RIcon={<LuMessagesSquare size={16} className="inline mr-2 group-hover:animate-wiggle" />}
            ticketId={ticketId}
            submit={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
            error={Object.keys(errors).length > 0}
        >
            <DevTool control={control} />
            <div className='w-full'>
                <form id="add-comment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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


                    {/* Assignedto  */}
                    <div className='flex gap-2 items-center text-xs'>
                        <p className='mb-1'>
                            AssignedTo:
                        </p>
                        {members?.filter(m => ticket?.assignedTo === m.id).map(m => (
                            <div
                                key={m.id}
                                className="flex w-fit items-center pl-1 pr-2 py-1 rounded-full bg-gray-50 dark:bg-blue-900/50 border border-gray-200 dark:border-blue-700 text-gray-700 dark:text-blue-300 text-xs font-medium"
                            >
                                <img src={m.avatar} alt={`${m.firstName} ${m.lastName}`} className="w-5 h-5 rounded-full mr-1" />
                                {m.firstName} {m.lastName}
                            </div>
                        ))}
                    </div>


                    {/* Comments list */}
                    <div className="flex flex-col gap-1 rounded-lg bg-blue-50 dark:bg-gray-700/30 p-2 overflow-y-auto scroll-auto">
                        {ticket?.comments?.length > 0 &&
                            <p className=" text-xs">comments</p>
                        }
                        <div className='max-h-40 overflow-y-auto'>
                            {ticket?.comments?.length > 0 ? (
                                ticket.comments.slice().reverse().map((comment, i) => (
                                    <div key={i} className="bg-white leading-2.75 border border-dashed border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 rounded-md py-1 px-1.5 w-full min-h-5.5 flex flex-col gap-1 overflow-auto">
                                        <p className='font-black text-[10px] text-blue-700'>@{comment.author}</p>
                                        <div className="border-l border-gray-300 dark:border-gray-500 px-1 w-full h-full flex flex-col gap-0.5 text-[12px]">
                                            <p className='text-[11px] font-medium'>{comment.message}</p>
                                            <p className="text-[9px] text-black/40 dark:text-gray-100">{comment.createdAt ? new Date(comment.createdAt).toUTCString().slice(0, -7) : ''}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 text-center">No comments yet</p>
                            )}
                        </div>
                    </div>



                    {/* Comment input */}
                    <FormCommentArea
                        name="comment"
                        placeholder="Write a comment..."
                        register={register}
                    />

                </form>
            </div>
        </TicketModal>
    )
}