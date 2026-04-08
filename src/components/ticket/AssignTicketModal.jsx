import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useMembers from '../../Hooks/Team/useMembers'
import useTicket from '../../Hooks/Tickets/useTicket'
import useAssignTicket from '../../Hooks/Tickets/useAssignTicket'
import { DevTool } from "@hookform/devtools";
import { LuUserRoundPlus, LuCheck, LuUser, LuX } from 'react-icons/lu'

import TicketModal from './TicketModal';
import AssignSearch from '../team/AssignSearch';

export default function AssignTicketModal({ ticketId, onClose, }) {
  const { register, setError, reset, control, formState: { errors } } = useForm()
  const { data: members } = useMembers()
  const { assignTicket } = useAssignTicket()
  const { data: ticket } = useTicket()

  const [selectedMembers, setSelectedMembers] = useState([])
  const [searchedMembers, setSearchedMembers] = useState(null)

  const totalMembers = members?.length ?? 0

  const listToDisplay = searchedMembers || members || [];

  const chipMemeberOptions = members?.map(member => ({
    label: `${member.firstName} ${member.lastName}`,
    avatar: member.avatar,
    value: member.id,
    team: member.team,
    ticketsAssigned: member.ticketsAssigned,
  }))

  const MemberOptions = listToDisplay.map(member => ({
    label: `${member.firstName} ${member.lastName}`,
    avatar: member.avatar,
    value: member.id,
    team: member.team,
    ticketsAssigned: member.ticketsAssigned,
  })) ?? []

  const toggleMember = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const removeMember = (id) => {
    setSelectedMembers(prev => prev.filter(e => e !== id))
  }

  const handleAssignConfirm = () => {
    selectedMembers.forEach((memberId) => {
      assignTicket({
        ticketId: ticketId,
        assigneeId: memberId,
      })
    });
    onClose();
    setSelectedMembers([]);
  }

  useEffect(() => {
    if (ticket) {
      reset({
        assigneeId: ticket.assigneeId
      })
    }
  }, [ticket])


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
        disabled={selectedMembers.length === 0}
      >
        <form>
          <div className='w-full'>
            <AssignSearch onResults={setSearchedMembers} />

            {/* Display selected members count and option to clear selection */}
            <div className='flex flex-col items-start gap-1 my-1'>
              <div className='flex flex-wrap items-center gap-1'>
                {chipMemeberOptions?.filter(opt => selectedMembers.includes(opt.value)).map(opt => (
                  <div
                    key={opt.value}
                    className="flex w-fit items-center pl-1 pr-2 py-1 rounded-full bg-gray-50 dark:bg-blue-900/50 border border-gray-200 dark:border-blue-700 text-gray-700 dark:text-blue-300 text-xs font-medium"
                  >
                    <img src={opt.avatar} alt={opt.label} className="w-5 h-5 rounded-full mr-1" />
                    {opt.label}
                    <button
                      type="button"
                      onClick={() => removeMember(opt.value)}
                      className="ml-0.5 hover:text-blue-900 dark:hover:text-blue-100 transition-colors cursor-pointer"
                    >
                      <LuX size={11} />
                    </button>
                  </div>
                ))}
              </div>

              {selectedMembers.length > 0 &&
                <button
                  type="button"
                  onClick={() => setSelectedMembers([])}
                  className="px-2 py-1 rounded-full text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear all
                </button>
              }

            </div>


            {/* Scrollable List Area */}
            <div className='h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col divide-y divide-gray-100 dark:divide-slate-700'>
              {MemberOptions.length > 0 ? (
                MemberOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleMember(opt.value)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors 
                      ${selectedMembers.includes(opt.value) ? 'bg-blue-100 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={opt.avatar} className="w-6 h-6 rounded-full" alt="" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{opt.label}</span>
                        <span className="text-[9px] uppercase text-gray-400 tracking-wider">{opt.team}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <span className="text-xs text-gray-900">{opt.ticketsAssigned || 0} Assigned</span>
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all
                       ${selectedMembers.includes(opt.value) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                        }`}>
                        {selectedMembers.includes(opt.value) && <LuCheck size={12} className="text-white" />}
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
              {selectedMembers.length} of {totalMembers} selected
              {totalMembers === 1 ? " member" : " members"}
            </div>

          </div>
        </form>
      </TicketModal>
    </>
  )
}