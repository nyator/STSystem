import { useEffect, useState } from 'react'
import { LuMail, LuTicketSlash } from 'react-icons/lu'
import { FormInput, FormTextArea } from '../ui/Input'
import { OptionButton } from '../ui/Button'
import { priorityOptions, statusOptions } from '../../constant/constants'

export default function TicketForm({
    ticket = null,
    onSubmit,
    isLoading = false,
    register,
    errors,
    reset,
    handleSubmit,
}) {

    const [selectedPriority, setSelectedPriority] = useState(ticket?.priority || "low")
    console.log(selectedPriority)
    const [selectedStatus, setSelectedStatus] = useState(ticket?.status || "open")
    const [openDropdown, setOpenDropdown] = useState(null)

    // For edit mode, populate form with existing ticket data
    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title || "",
                email: ticket.customerEmail || "",
                description: ticket.description || "",
            })
            setSelectedPriority(ticket.priority || "low")
            setSelectedStatus(ticket.status || "open")
        }
    }, [ticket, reset])



    const handleFormSubmit = (data) => {
        onSubmit({
            ...data,
            priority: selectedPriority,
            status: selectedStatus
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormInput
                name="title"
                placeholder="Enter Ticket Title"
                register={register}
                formfields={{ required: "Title is required" }}
                error={errors.title}
            />
            <FormInput
                name="email"
                placeholder="Enter customer email"
                icon={<LuMail className="absolute left-3 top-3 text-gray-700" size={15} />}
                register={register}
                formfields={{
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    },
                }}
                error={errors.email}
            />
            <FormTextArea
                name="description"
                placeholder="Enter Ticket Description"
                register={register}
                formfields={{ required: "Description is required" }}
                error={errors.description}
            />

            <div className='flex space-x-2 justify-center'>
                <OptionButton
                    title="Priority"
                    options={priorityOptions.map(opt => ({ ...opt, onClick: () => setSelectedPriority(opt.value) }))}
                    selected={selectedPriority}
                    isOpen={openDropdown === 'priority'}
                    setIsOpen={(open) => setOpenDropdown(open ? 'priority' : null)}
                >
                    Priority
                </OptionButton>
                <OptionButton
                    title="Status"
                    options={statusOptions.map(opt => ({ ...opt, onClick: () => setSelectedStatus(opt.value) }))}
                    selected={selectedStatus}
                    isOpen={openDropdown === 'status'}
                    setIsOpen={(open) => setOpenDropdown(open ? 'status' : null)}
                >
                    Status
                </OptionButton>
            </div>
        </form>
    )
}

