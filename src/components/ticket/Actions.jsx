import toast from 'react-hot-toast'

import { useState } from 'react'
import { LuTrash2, LuSquarePen, LuDelete, LuTicketSlash } from 'react-icons/lu'
import TicketModal from './TicketModal'
import TicketForm from './TicketForm'
import useTicket from '../../Hooks/Tickets/useTicket'
import useDeleteTicket from "../../Hooks/Tickets/useDeleteTicket"
import useEditTicket from "../../Hooks/Tickets/useEditTicket"

import { useForm } from 'react-hook-form'

const EditAction = ({ setOpenModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setOpenModal(true) }}
        className="text-blue-500 bg-blue-50 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuSquarePen size={15} />
    </button>
)

const DeleteAction = ({ setDeleteModal }) => {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); setDeleteModal(true) }}
            className="text-red-500 bg-red-50 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 p-1.5 rounded-md transition-all ease-in-out duration-300"
        >
            <LuTrash2 size={15} />
        </button>
    )
}

export default function Actions({ ticketId }) {
    const [openModal, setOpenModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const { updateTicket, isLoading: isUpdating } = useEditTicket()
    const { deleteTicket, isLoading: isDeleting } = useDeleteTicket()
    const { ticket } = useTicket(ticketId)

    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            email: "",
            description: "",
            priority: "low",
            status: "open",
        }
    })

    const handleUpdate = (data) => {
        updateTicket({
            ticketId,
            ...data,
        }, {
            onSuccess: () => {
                setOpenModal(false)
                toast.success("Ticket Updated Successfully")
            }
        })
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

            {/* EDIT TICKET */}
            <TicketModal
                isOpen={openModal}
                onClose={(e) => { e.stopPropagation(); setOpenModal(false) }}
                TitleIcon={<LuTicketSlash className='mr-2' />}
                LAction="Cancel"
                RAction="Update Ticket"
                RIcon={<LuSquarePen size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                ticketId={ticketId}
                submit={handleSubmit(handleUpdate)}
            >
                <TicketForm
                    ticket={ticket}
                    onSubmit={handleUpdate}
                    isLoading={isUpdating}
                    register={register}
                    errors={errors}
                    reset={reset}
                    handleSubmit={handleSubmit}
                    setValue={setValue}
                    getValues={getValues}
                />
            </TicketModal>

            {/* DELETE MODAL */}
            <TicketModal
                isOpen={deleteModal}
                onClose={(e) => { e.stopPropagation(); setDeleteModal(false) }}
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

