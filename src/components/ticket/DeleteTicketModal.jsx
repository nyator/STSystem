import useDeleteTicket from '../../Hooks/Tickets/useDeleteTicket'
import { useForm, useWatch } from 'react-hook-form'

import { DevTool } from "@hookform/devtools";

import TicketModal from './TicketModal';
import { FormInputEmpty } from '../ui/Input'
import { LuTrash2 } from 'react-icons/lu'

export default function DeleteTicketModal({ ticketId, onClose, }) {
    const { deleteTicket, isLoading } = useDeleteTicket()
    const { register, getValues, setError, reset, control, formState: { errors } } = useForm()
    const confirmDeleteValue = useWatch({ control, name: 'confirmDelete', defaultValue: '' })

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
            onSuccess: () => {
                onClose();
                reset()
            },
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
            <DevTool control={control} />
            <TicketModal
                isOpen={!!ticketId}
                onClose={onClose}
                title="Confirm Delete"
                LAction="Cancel"
                RAction="Confirm Delete"
                RVariant="danger"
                RIcon={<LuTrash2 size={16} className={`inline mr-2 ${confirmDeleteValue !== ticketId ? "" : "group-hover:animate-wiggle"}`} />}
                submit={handleDeleteConfirm}
                isLoading={isLoading}
                deleteError={errors.confirmDelete}
                disabled={confirmDeleteValue !== ticketId}
            >
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