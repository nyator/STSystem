import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LuTrash2, LuSquarePen, LuView, LuEye, LuDelete, LuPlus, LuMail, LuTicket, LuTicketX, LuTicketsPlane, LuTicketSlash } from 'react-icons/lu'
import { FormInput, FormTextArea } from '../ui/Input'
import TicketModal from './TicketModal'
import useTicket from '../../Hooks/useTicket'
import useDeleteTicket from "../../Hooks/useDeleteTicket"
import useEditTicket from "../../Hooks/useEditTicket"
import { OptionButton } from '../ui/Button'

import toast from 'react-hot-toast'

const EditAction = ({ setOpenModal }) => (
    <button
        onClick={() => setOpenModal(true)}
        className="text-blue-500 bg-blue-50 hover:bg-blue-200 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuEye size={15} />
    </button>
)


const DeleteAction = ({ setDeleteModal }) => {
    return (
        <button
            onClick={() => setDeleteModal(true)}
            className="text-red-500 bg-red-50 hover:bg-red-200 p-1.5 rounded-md transition-all ease-in-out duration-300"
        >
            <LuTrash2 size={15} />
        </button>
    )
}

export default function Actions({ ticketId }) {
    const [openModal, setOpenModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedPriority, setSelectedPriority] = useState("low")
    const [selectedStatus, setSelectedStatus] = useState("open")

    const [openDropdown, setOpenDropdown] = useState(null)

    const { updateTicket } = useEditTicket()
    const { deleteTicket } = useDeleteTicket()
    const { ticket } = useTicket(ticketId)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            email: "",
            description: "",
        }
    })

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

    const priorityOptions = [
        { label: "Low", value: "low", onClick: () => setSelectedPriority("low") },
        { label: "Medium", value: "medium", onClick: () => setSelectedPriority("medium") },
        { label: "High", value: "high", onClick: () => setSelectedPriority("high") },
    ]

    const statusOptions = [
        { label: "Open", value: "open", onClick: () => setSelectedStatus("open") },
        { label: "In-progress", value: "in-progress", onClick: () => setSelectedStatus("in-progress") },
        { label: "Resolved", value: "resolved", onClick: () => setSelectedStatus("resolved") },
    ]

    const onSubmit = (data) => {
        updateTicket({
            ticketId,
            ...data,
            priority: selectedPriority,
            status: selectedStatus
        })
        setOpenModal(false)
        toast.success("Ticket Updated Successfully")
    }

    const handleDeleteConfirm = () => {
        deleteTicket(ticketId, {
            onSuccess: () => {
                setDeleteModal(false)
                toast.success("Ticket deleted!")
            }
        })
    }

    return (
        <>
            <div className='flex gap-2'>
                <EditAction ticketId={ticketId} setOpenModal={setOpenModal} />
                <DeleteAction ticketId={ticketId} setDeleteModal={setDeleteModal} />
            </div>

            {/* CREATE TICKET */}
            <TicketModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                // title="Edit Ticket"
                TitleIcon={<LuTicketSlash className='mr-2' />}
                LAction="Cancel"
                RAction="Update Ticket"
                RIcon={<LuSquarePen size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                ticketId={ticketId}
                submit={handleSubmit(onSubmit)}
            >
                <form id="edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            // pattern: {
                            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            // },
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
                    <div className='flex space-x-2'>
                        <OptionButton
                            title="Priority"
                            options={priorityOptions}
                            selected={selectedPriority}
                            isOpen={openDropdown === 'priority'}
                            setIsOpen={(open) => setOpenDropdown(open ? 'priority' : null)}
                        >
                            Priority
                        </OptionButton>
                        <OptionButton
                            title="Status"
                            options={statusOptions}
                            selected={selectedStatus}
                            isOpen={openDropdown === 'status'}
                            setIsOpen={(open) => setOpenDropdown(open ? 'status' : null)}
                        >
                            Status
                        </OptionButton>
                    </div>
                </form>
            </TicketModal>

            {/* DELETE MODAL */}
            <TicketModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                title='Confirm Delete'
                LAction='Cancel'
                RAction='Confirm Delete'
                RIcon={<LuDelete size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                submit={handleDeleteConfirm}
            >
                <p className='text-center'>
                    Are you sure you want to delete Ticket: <span className='font-bold'>{ticketId}</span>
                </p>
            </TicketModal>
        </>
    )
}