import { useForm } from 'react-hook-form'

import { DevTool } from "@hookform/devtools";
import { LuUserRoundPlus } from 'react-icons/lu'

import TicketModal from './TicketModal';
import { OptionButton } from '../ui/Button';

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const STATUS_OPTIONS = ['open', 'assigned', 'in-progress', 'resolved']

export default function ChangeStatusModal({ ticketId, onClose, }) {
    const { register, setError, reset, control, formState: { errors } } = useForm()


    
    
    const handleAssignConfirm = () => {

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
        <>
            <DevTool control={control} />
            <TicketModal
                isOpen={!!ticketId}
                onClose={onClose}
                ticketId={ticketId}
                title="Update Status:"
                LAction="Cancel"
                RAction="Update Status"
                RVariant="primary"
                RIcon={<LuUserRoundPlus size={16} className={`inline mr-1`} />}
                submit={handleAssignConfirm}
                deleteError={errors.confirmDelete}
            // disabled={confirmDeleteValue !== ticketId}
            >
                <form className="space-y-4">
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
                </form>
            </TicketModal>
        </>
    )
}