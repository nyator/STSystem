import { useState } from 'react'
import { LuTrash2, LuSquarePen, LuDelete, LuTicketSlash } from 'react-icons/lu'

import TicketModal from './TicketModal'
import EditTicketModal from './EditTicketModal'
import useDeleteTicket from '../../Hooks/Tickets/useDeleteTicket'

const EditAction = ({ setOpenModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setOpenModal(true) }}
        className="text-blue-500 bg-blue-50 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuSquarePen size={15} />
    </button>
)

const DeleteAction = ({ setDeleteModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setDeleteModal(true) }}
        className="text-red-500 bg-red-50 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuTrash2 size={15} />
    </button>
)

export default function Actions({ ticketId }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const { deleteTicket, isLoading: isDeleting } = useDeleteTicket()

    const handleDeleteConfirm = () => {
        deleteTicket(ticketId, {
            onSuccess: () => {
                setDeleteModal(false)
            },
        })
    }

    return (
        <>
            <div className="flex gap-2">
                <EditAction setOpenModal={setOpenEdit} />
                <DeleteAction setDeleteModal={setDeleteModal} />
            </div>

            {/* Shared edit modal */}
            <EditTicketModal
                ticketId={openEdit ? ticketId : null}
                onClose={() => setOpenEdit(false)}
            />

            {/* Delete confirmation modal */}
            <TicketModal
                isOpen={deleteModal}
                onClose={(e) => { e.stopPropagation(); setDeleteModal(false) }}
                title="Confirm Delete"
                LAction="Cancel"
                RAction="Confirm Delete"
                RIcon={<LuDelete size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                submit={handleDeleteConfirm}
                isLoading={isDeleting}
            >
                <p className="text-center">
                    Are you sure you want to delete Ticket:{' '}
                    <span className="font-bold">{ticketId}</span>
                </p>
            </TicketModal>
        </>
    )
}