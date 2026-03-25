import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { LuSquarePen, LuMail, LuTicketSlash } from 'react-icons/lu'
import { FormInput, FormTextArea } from '../ui/Input'
import { OptionButton } from '../ui/Button'
import TicketModal from './TicketModal'
import useTicket from '../../Hooks/Tickets/useTicket'
import useEditTicket from '../../Hooks/Tickets/useEditTicket'

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const STATUS_OPTIONS = ['open', 'in-progress', 'resolved']


export default function EditTicketModal({ ticketId, onClose }) {
    const { ticket } = useTicket(ticketId)
    const { updateTicket, isLoading: isUpdating } = useEditTicket()

    const [selectedPriority, setSelectedPriority] = useState('low')
    const [selectedStatus, setSelectedStatus] = useState('open')
    const [openDropdown, setOpenDropdown] = useState(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            title: '',
            email: '',
            description: '',
            priority: 'low',
            status: 'open',
        },
    })

    // Populate form whenever the ticket data arrives / changes
    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title || '',
                email: ticket.customerEmail || '',
                description: ticket.description || '',
                priority: ticket.priority || 'low',
                status: ticket.status || 'open',
            })
            setSelectedPriority(ticket.priority || 'low')
            setSelectedStatus(ticket.status || 'open')
        }
    }, [ticket, reset])

    const handlePriorityChange = (value) => {
        setSelectedPriority(value)
        setValue('priority', value, { shouldDirty: true })
    }

    const handleStatusChange = (value) => {
        setSelectedStatus(value)
        setValue('status', value, { shouldDirty: true })
    }

    const onSubmit = (data) => {
        if (!isDirty) {
            onClose()
            toast.error('No changes have been made.')
            return
        }

        const formValues = getValues()
        updateTicket(
            {
                ticketId,
                title: data.title,
                email: data.email,
                description: data.description,
                priority: formValues.priority || selectedPriority,
                status: formValues.status || selectedStatus,
            },
            {
                onSuccess: () => {
                    onClose()
                },
            }
        )
    }

    const priorityOptions = PRIORITY_OPTIONS.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
        onClick: () => handlePriorityChange(value),
    }))

    const statusOptions = STATUS_OPTIONS.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
        onClick: () => handleStatusChange(value),
    }))

    return (
        <TicketModal
            isOpen={!!ticketId}
            onClose={(e) => { e?.stopPropagation?.(); onClose() }}
            TitleIcon={<LuTicketSlash className="mr-2" />}
            LAction="Cancel"
            RAction="Update Ticket"
            RIcon={<LuSquarePen size={16} className="inline mr-2 group-hover:animate-wiggle" />}
            ticketId={ticketId}
            submit={handleSubmit(onSubmit)}
            isLoading={isUpdating}
        >
            <form id="edit-ticket-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                    name="title"
                    placeholder="Enter Ticket Title"
                    register={register}
                    formfields={{ required: 'Title is required' }}
                    error={errors.title}
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
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    error={errors.email}
                />
                <FormTextArea
                    name="description"
                    placeholder="Enter Ticket Description"
                    register={register}
                    formfields={{ required: 'Description is required' }}
                    error={errors.description}
                />
                <div className="flex space-x-2 justify-center">
                    <OptionButton
                        title="Priority"
                        options={priorityOptions}
                        selected={selectedPriority}
                        isOpen={openDropdown === 'priority'}
                        setIsOpen={(open) => setOpenDropdown(open ? 'priority' : null)}
                    />
                    <OptionButton
                        title="Status"
                        options={statusOptions}
                        selected={selectedStatus}
                        isOpen={openDropdown === 'status'}
                        setIsOpen={(open) => setOpenDropdown(open ? 'status' : null)}
                    />
                </div>
            </form>
        </TicketModal>
    )
}