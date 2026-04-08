import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LuPencil } from 'react-icons/lu'

import TicketModal from './TicketModal';
import { OptionButton } from '../ui/Button';
import useTicket from '../../Hooks/Tickets/useTicket';
import useEditTicket from '../../Hooks/Tickets/useEditTicket';

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const STATUS_OPTIONS = ['open', 'assigned', 'in-progress', 'resolved']

export default function ChangeStatusModal({ ticketId, onClose }) {
  const { setValue, control, formState: { errors, isDirty } } = useForm()
  const { ticket } = useTicket(ticketId)
  const { updateTicket } = useEditTicket()

  const [selectedPriority, setSelectedPriority] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    if (ticket) {
      setSelectedPriority(ticket.priority || 'low')
      setSelectedStatus(ticket.status || 'open')
    }
  }, [ticket])

  const handlePriorityChange = (value) => {
    setSelectedPriority(value)
    setValue('priority', value, { shouldDirty: true })
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
    setValue('status', value, { shouldDirty: true })
  }

  const handleSubmit = () => {
    updateTicket({
      ticketId,
      priority: selectedPriority,
      status: selectedStatus,
    })
    onClose()
  }

  const priorityOptions = PRIORITY_OPTIONS.map(value => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
    onClick: () => handlePriorityChange(value),
  }))

  const statusOptions = STATUS_OPTIONS.map(value => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
    onClick: () => handleStatusChange(value),
  }))

  return (
    <>
      <TicketModal
        isOpen={!!ticketId}
        onClose={onClose}
        ticketId={ticketId}
        title="Update Status:"
        LAction="Cancel"
        RAction="Update Status"
        RVariant="primary"
        RIcon={<LuPencil size={16} className="inline mr-1" />}
        submit={handleSubmit}
        deleteError={errors.confirmDelete}
        disabled={!isDirty}
      >
        <form className="gap-4 flex items-center justify-center mt-28">
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