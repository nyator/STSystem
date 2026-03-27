import { useState } from 'react'
import { LuTrash2, LuSquarePen } from 'react-icons/lu'

import TicketModal from './TicketModal'
import EditTicketModal from './EditTicketModal'
import useDeleteTicket from '../../Hooks/Tickets/useDeleteTicket'
import { FormInputEmpty } from '../ui/Input'

import { useForm, useWatch } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";


const EditAction = ({ setOpenModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setOpenModal(true) }}
        className="text-blue-600 bg-blue-50 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuSquarePen size={15} />
    </button>
)

const DeleteAction = ({ setDeleteModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setDeleteModal(true) }}
        className="text-red-600 bg-red-50 dark:bg-red-200 hover:bg-red-200 dark:hover:bg-red-300 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuTrash2 size={15} />
    </button>
)

export default function Actions({ ticketId }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const { register, getValues, setError, reset, control, formState: { errors } } = useForm()
    const { deleteTicket, isLoading: isDeleting } = useDeleteTicket()

    const confirmDeleteValue = useWatch({ control, name: 'confirmDelete', defaultValue: '' })

    const handleCloseDeleteModal = () => {
        reset()
        setDeleteModal(false)
    }

    const handleDeleteConfirm = () => {
        const { confirmDelete } = getValues()

        if (confirmDelete !== ticketId) {
            setError('confirmDelete', {
                type: 'manual',
                message: `Input must match Ticket ID: ${ticketId}`,
            })
            return
        }

        deleteTicket(ticketId, {
            onSuccess: () => handleCloseDeleteModal(),
            onError: () => {
                setError('confirmDelete', {
                    type: 'manual',
                    message: 'Failed to delete ticket. Please try again.',
                })
            },
        })
    }

    return (
        <>
            <div className="flex gap-2">
                <EditAction setOpenModal={setOpenEdit} />
                <DeleteAction setDeleteModal={setDeleteModal} />
            </div>

            {openEdit && <EditTicketModal
                ticketId={ticketId}
                onClose={() => setOpenEdit(false)}
            />}

            <TicketModal
                isOpen={deleteModal}
                onClose={handleCloseDeleteModal}
                title="Confirm Delete"
                LAction="Cancel"
                RAction="Confirm Delete"
                RIcon={<LuTrash2 size={16} className={`inline mr-2 ${confirmDeleteValue !== ticketId ? "" : "group-hover:animate-wiggle"}`} />}
                submit={handleDeleteConfirm}
                isLoading={isDeleting}
                deleteError={errors.confirmDelete}
                disabled={confirmDeleteValue !== ticketId}
            >
                <DevTool control={control} /> {/* set up the dev tool */}

                <p className="text-center mb-3">
                    To confirm, type <span className="font-bold">"{ticketId}"</span> in the box below
                </p>

                <FormInputEmpty
                    name="confirmDelete"
                    register={register}
                    formfields={{ required: 'Delete input is required' }}
                    error={errors.confirmDelete}
                />
            </TicketModal>
        </>
    )
}