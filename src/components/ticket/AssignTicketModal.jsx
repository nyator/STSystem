import useDeleteTicket from '../../Hooks/Tickets/useDeleteTicket'
import { useForm } from 'react-hook-form'

import { DevTool } from "@hookform/devtools";
import { LuUserRoundPlus } from 'react-icons/lu'

import TicketModal from './TicketModal';
import { OptionButton } from '../ui/Button';

export default function AssignTicketModal({ ticketId, onClose, }) {
  const { register, setError, reset, control, formState: { errors } } = useForm()

  const handleAssignConfirm = () => {
  }

  return (
    <>
      <DevTool control={control} />
      <TicketModal
        isOpen={!!ticketId}
        onClose={onClose}
        ticketId={ticketId}
        title="Assign:"
        LAction="Cancel"
        RAction="Assign"
        RVariant="primary"
        RIcon={<LuUserRoundPlus size={16} className={`inline mr-1`} />}
        submit={handleAssignConfirm}
        // isLoading={isLoading}
        deleteError={errors.confirmDelete}
      // disabled={confirmDeleteValue !== ticketId}
      >
        <form className="space-y-4">
          {/* <OptionButton
            title="Priority"
            options={priorityOptions}
            selected={selectedPriority}
            isOpen={openDropdown === 'priority'}
            setIsOpen={(open) => setOpenDropdown(open ? 'priority' : null)}
          /> */}
        </form>
      </TicketModal>
    </>
  )
}