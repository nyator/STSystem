import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuMail, LuTicketSlash } from 'react-icons/lu'
import { FormInput, FormTextArea } from '../ui/Input'
import { OptionButton } from '../ui/Button'
import { priorityOptions, statusOptions } from '../../constant/constants'

export default function TicketForm({
    ticket = null,
    onSubmit,
    isLoading = false,
}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            email: "",
            description: "",
        }
    })

    // For edit mode, populate form with existing ticket data
    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title || "",
                email: ticket.customerEmail || "",
                description: ticket.description || "",
            })
        }
    }, [ticket, reset])

    // Local state for priority and status (used in edit mode)
    const [selectedPriority, setSelectedPriority] = useState(ticket?.priority || "low")
    const [selectedStatus, setSelectedStatus] = useState(ticket?.status || "open")
    const [openDropdown, setOpenDropdown] = useState(null)

    // const handleFormSubmit = (data) => {
    //     if (isEditMode) {
    //         onSubmit({
    //             ...data,
    //             priority: selectedPriority,
    //             status: selectedStatus
    //         })
    //     } else {
    //         onSubmit(data)
    //     }
    // }

    return (
        <form className="space-y-4">
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

            {/* <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
                {isLoading ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
            </button> */}
        </form>
    )
}

