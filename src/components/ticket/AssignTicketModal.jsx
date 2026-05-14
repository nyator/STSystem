import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useMembers from '../../Hooks/Team/useMembers'
import useTicket from '../../Hooks/Tickets/useTicket'
import useAssignTicket from '../../Hooks/Tickets/useAssignTicket'
import useUpdateAssign from '../../Hooks/Team/useUpdateAssign'
import { DevTool } from "@hookform/devtools";
import { LuUserRoundPlus, LuCheck, LuUser } from 'react-icons/lu'

import NewTicketModal from './NewTicketModal';
import AssignSearch from '../team/AssignSearch';
import MemberPill from '../ui/MemberPill';
import { useAuth } from '../../Hooks/useAuth';
import { addNotification } from '../../utils/NotificationUtil';

export default function AssignTicketModal({ ticketId, onClose, }) {
  const { reset, control, formState: { errors } } = useForm()
  const { data: members } = useMembers()
  const { assignTicket } = useAssignTicket()
  const { updateAssign } = useUpdateAssign()
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
      // setSelectedMember(ticket?.assignedTo || null)
    }
  }, [ticket, reset])


  const handleAssignConfirm = () => {
    if (!selectedMember) return

    assignTicket({ ticketId, assignedTo: selectedMember, actor: user })
    updateAssign({ memberId: selectedMember, ticketId })  // <-- add this
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
      <DevTool control={control} />
      <NewTicketModal
        isOpen={!!ticketId}
        onClose={onClose}
        ticketId={ticketId}
        title="Assign Ticket"
        LAction="Cancel"
        RAction="Assign"
        RVariant="primary"
        RIcon={<LuUserRoundPlus size={16} className={`inline mr-1`} />}
        submit={handleAssignConfirm}
        // isLoading={isLoading}
        deleteError={errors.confirmDelete}
        disabled={!selectedMember}
      >
        <form>
          <div className='w-full'>
            <AssignSearch onResults={setSearchedMembers} />

            {/* Display selected members count and option to clear selection */}
            <div className='flex flex-col items-start gap-1 my-1'>
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
            <div className='h-4/6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col divide-y divide-gray-100 dark:divide-slate-700'>
              {listToDisplay.length > 0 ? (
                listToDisplay.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMember(m.id)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors 
        ${selectedMember === m.id ? 'bg-blue-100 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} className="w-6 h-6 rounded-full" alt="" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{m.firstName} {m.lastName}</span>
                        <span className="text-[9px] uppercase text-gray-700 tracking-wider">{m.team}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      {m.ticketsAssigned > 0 ?
                        (
                          <span className="text-xs text-gray-800">{m.ticketsAssigned} Assigned</span>
                        ) : (
                          <span className="text-xs text-gray-400">Unassigned</span>
                        )}
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all
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
