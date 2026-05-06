import { deleteMembers } from '../../utils/TeamUtil';
import { useForm, useWatch } from 'react-hook-form'

import { DevTool } from "@hookform/devtools";

import TicketModal from '../ticket/TicketModal';
import { FormInputEmpty } from '../ui/Input'
import { LuTrash2 } from 'react-icons/lu'
import useDeleteMember from '../../Hooks/Team/useDeleteMember';

export default function DeleteMemberModal({ MemberId, onClose, }) {
    // const { deleteTicket, isLoading } = useDeleteTicket()
    const { deleteMember, isLoading } = useDeleteMember()
    // const
    const { register, getValues, setError, reset, control, formState: { errors } } = useForm()
    const confirmDeleteValue = useWatch({ control, name: 'confirmDelete', defaultValue: '' })

    const handleDeleteConfirm = () => {
        const { confirmDelete } = getValues()

        if (confirmDelete !== MemberId) {
            setError('confirmDelete', {
                type: 'manual',
                message: `Input mustd match Member ID: ${MemberId}`,
            })
            return
        }

        deleteMember(MemberId, {
            onSuccess: () => {
                onClose();
                reset()
            },
            onError: (err) => {
                setError('confirmDelete', {
                    type: 'manual',
                    message: err?.message || 'Failed to delete member. Please try again.',
                })
            }
        })
    }

    return (
        <>
            <DevTool control={control} />
            <TicketModal
                isOpen={!!MemberId}
                onClose={onClose}
                title="Delete Member"
                LAction="Cancel"
                RAction="Confirm Delete"
                RVariant="danger"
                RIcon={<LuTrash2 size={16} className={`inline mr-2 ${confirmDeleteValue !== MemberId ? "" : "group-hover:animate-wiggle"}`} />}
                submit={handleDeleteConfirm}
                isLoading={isLoading}
                deleteError={errors.confirmDelete}
                disabled={confirmDeleteValue !== MemberId}
            >
                <p className="text-center mb-3">
                    To confirm, type <span className="font-bold">"{MemberId}"</span> in the box below
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