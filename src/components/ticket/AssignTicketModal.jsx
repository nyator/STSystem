import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useMembers from '../../Hooks/Team/useMembers'
import useTicket from '../../Hooks/Tickets/useTicket'
import useAssignTicket from '../../Hooks/Tickets/useAssignTicket'
import { LuUserRoundPlus, LuCheck, LuUser } from 'react-icons/lu'

import NewTicketModal from './NewTicketModal';
import AssignSearch from '../team/AssignSearch';
import MemberPill from '../ui/MemberPill';
import { useAuth } from '../../Hooks/useAuth';
import { addNotification } from '../../utils/NotificationUtil';

export default function AssignTicketModal({ ticketId, onClose, }) {
  const { reset, formState: { errors } } = useForm()
  const { data: members } = useMembers()
  const { assignTicket, isLoading } = useAssignTicket()
  const { ticket } = useTicket(ticketId)
  const { user } = useAuth()

  const [selectedMember, setSelectedMember] = useState(null)
  const [searchedMembers, setSearchedMembers] = useState(null)

  const totalMembers = members?.length ?? 0
  const listToDisplay = searchedMembers || members || [];

  const toggleMember = (id) => {
    setSelectedMember((prev) => (prev === id ? null : id))
  }

  const removeMember = () => {
    setSelectedMember(null)
  }

  useEffect(() => {
    if (ticket) {
      reset({
        assignedTo: ticket.assignedTo
      })
      const timer = setTimeout(() => setSelectedMember(ticket?.assignedTo || null), 0)
      return () => clearTimeout(timer)
    }
  }, [ticket, reset])


  const handleAssignConfirm = () => {
    if (!selectedMember) return

    assignTicket({ ticketId, assignedTo: selectedMember, actor: user })
    addNotification({
      title: "Ticket assigned",
      message: `${ticketId} was assigned to you`,
      ticketId,
      targetUserId: selectedMember,
      type: "assignment",
    })

    onClose()
    setSelectedMember(null)
  }

  return (
    <>
      <NewTicketModal
        size="md"
        isOpen={!!ticketId}
        onClose={onClose}
        ticketId={ticketId}
        title="Assign Ticket"
        LAction="Cancel"
        RAction="Assign"
        RVariant="primary"
        RIcon={<LuUserRoundPlus size={16} className={`inline mr-1`} />}
        submit={handleAssignConfirm}
        error={errors.confirmDelete}
        disabled={!selectedMember || selectedMember === ticket?.assignedTo || isLoading}
      >
        <form className="flex min-h-0 flex-col">
          <div className='w-full space-y-3'>
            <AssignSearch onResults={setSearchedMembers} />

            {/* Display selected members count and option to clear selection */}
            <div className='min-h-8 rounded-lg border border-gray-100 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950/40'>
              <div className='flex flex-wrap items-center gap-1'>
                {members
                  ?.filter((member) => selectedMember === member.id)
                  .map((member) => (
                    <MemberPill
                      key={member.id}
                      member={member}
                      onRemove={removeMember}
                    />
                  ))}
                {!selectedMember && (
                  <span className="text-xs text-gray-400">Select one team member</span>
                )}
              </div>

              {selectedMember &&
                <button
                  type="button"
                  onClick={removeMember}
                  className="px-2 py-1 rounded-full text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear selection
                </button>
              }
            </div>


            {/* Scrollable List Area */}
            <div className='max-h-[52vh] min-h-72 overflow-y-auto rounded-lg border border-gray-200 bg-white scrollbar-thin scrollbar-thumb-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:scrollbar-thumb-gray-700'>
              {listToDisplay.length > 0 ? (
                listToDisplay.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMember(m.id)}
                    className={`flex w-full items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 dark:border-gray-800 
        ${selectedMember === m.id ? 'bg-blue-50 dark:bg-blue-500/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img src={m.avatar} className="h-8 w-8 rounded-full object-cover" alt="" />
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-xs font-semibold text-gray-800 dark:text-gray-100">{m.firstName} {m.lastName}</span>
                        <span className="truncate text-[10px] uppercase tracking-wide text-gray-400">{m.team || "No team"}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {m.ticketsAssigned > 0 ?
                        (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{m.ticketsAssigned} assigned</span>
                        ) : (
                          <span className="text-xs text-gray-400">Unassigned</span>
                        )}
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all
          ${selectedMember === m.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                        {selectedMember === m.id && <LuCheck size={12} className="text-white" />}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                  <LuUser size={24} className="mb-2 opacity-20" />
                  <p className="text-xs">No team members found</p>
                </div>
              )}
            </div>

            <div className="inline-flex px-2 py-0.5  text-xs text-gray-400 mt-2 w-full justify-end">
              {selectedMember ? 1 : 0} of {totalMembers} selected
              {totalMembers === 1 ? " member" : " members"}
            </div>

          </div>
        </form>
      </NewTicketModal>
    </>
  )
}
