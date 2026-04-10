import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { LuTicketSlash, LuRefreshCcwDot, LuUserRoundPlus } from 'react-icons/lu'
import { FormInput, FormTextArea } from '../ui/Input'
import { OptionButton } from '../ui/Button'
import TicketModal from './TicketModal'
import AssignTicketModal from './AssignTicketModal'
import useTicket from '../../Hooks/Tickets/useTicket'
import useEditTicket from '../../Hooks/Tickets/useEditTicket'
import useMembers from '../../Hooks/Team/useMembers'
import CustomInfoToast from '../ui/CustomInfoToast'
import { getAvailableTransitions } from '../../utils/TicketUtil'

export default function ChangeStatusModal({ ticketId, onClose }) {
    const { ticket } = useTicket(ticketId)
    const { data: members } = useMembers()
    const { updateTicket, isLoading: isUpdating } = useEditTicket()

    const [selectedStatus, setSelectedStatus] = useState('open')
    const [openDropdown, setOpenDropdown] = useState(null)
    const [openAssign, setOpenAssign] = useState(false)

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        register,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            status: 'open',
        },
    })

    const isOpen = ticket?.status === 'open'
    const isUnassigned = !ticket?.assigneeId
    const isClosed = ticket?.status === 'closed'

    const statusOptions = [
        ...(ticket?.status
            ? [{ label: ticket.status, value: ticket.status, disabled: true }]
            : []
        ),
        ...getAvailableTransitions(ticket?.status).map((value) => ({
            label: value.charAt(0).toUpperCase() + value.slice(1),
            value,
            onClick: () => handleStatusChange(value),
        })),
    ]

    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title || '',
                description: ticket.description || '',
                status: ticket.status || 'open',
            })
            setSelectedStatus(ticket.status || 'open')
        }
    }, [ticket, reset])

    const handleStatusChange = (value) => {
        setSelectedStatus(value)
        setValue('status', value, { shouldDirty: true })
    }

    const onSubmit = (data) => {
        if (!isDirty) {
            onClose()
            CustomInfoToast()
            return
        }

        updateTicket(
            { ticketId, comments: data },
            {
                onSuccess: () => {
                    reset({ ...getValues(), comment: '' })
                    setShowCommentBox(false)
                }
            }
        )
    }

    return (
        <>
            <TicketModal
                isOpen={!!ticketId}
                onClose={onClose}
                TitleIcon={<LuTicketSlash className="mr-2" />}
                LAction="Cancel"
                RAction="Update Status"
                RIcon={<LuRefreshCcwDot size={16} className="inline group-hover:animate-wiggle" />}
                ticketId={ticketId}
                submit={handleSubmit(onSubmit)}
                disabled={isUpdating || (isOpen && isUnassigned) || isClosed || !isDirty}
                error={Object.keys(errors).length > 0}
            >
                <DevTool control={control} />
                <div className='w-full'>
                    <form id="change-status-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <FormInput
                            name="title"
                            placeholder="Ticket Title"
                            register={register}
                            formfields={{}}
                            error={errors.title}
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

                        {/* Display selected members count and option to clear selection */}
                        <div className='flex flex-col items-start gap-1'>
                            <div className='flex flex-wrap items-center gap-1'>
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
                        </div>

                        {isOpen && isUnassigned ? (
                            <div className="flex flex-col items-center gap-2 py-3 px-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                                <p className="text-xs text-yellow-700 dark:text-yellow-400 text-center">
                                    This ticket must be assigned before the status can move forward.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setOpenAssign(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800/40 dark:hover:bg-yellow-800/60 text-yellow-800 dark:text-yellow-300 transition-colors"
                                >
                                    <LuUserRoundPlus size={13} />
                                    Assign Ticket
                                </button>
                            </div>
                        ) : isClosed ? (
                            <div className="flex flex-col items-center gap-2 py-3 px-4 rounded-lg border border-gray-200 bg-gray-100 dark:bg-gray-800/40 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    This ticket is closed and cannot be updated.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap justify-center">
                                <OptionButton
                                    title="Status"
                                    options={statusOptions}
                                    selected={selectedStatus}
                                    isOpen={openDropdown === 'status'}
                                    setIsOpen={(open) => setOpenDropdown(open ? 'status' : null)}
                                />
                            </div>
                        )}



                    </form>
                </div>
            </TicketModal>

            {openAssign && (
                < AssignTicketModal
                    ticketId={ticketId}
                    onClose={() => setOpenAssign(false)}
                />
            )}
        </>
    )
}