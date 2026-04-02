import { useForm } from 'react-hook-form'
import { useState } from 'react'
import useMembers from '../../Hooks/Team/useMembers'
import useTicket from '../../Hooks/Tickets/useTicket'
import { DevTool } from "@hookform/devtools";
import { LuUserRoundPlus, LuCheck, LuUser, LuX } from 'react-icons/lu'

import TicketModal from './TicketModal';
import { OptionButton } from '../ui/Button';
import SearchInput from '../ui/Input';
import AssignSearch from '../team/AssignSearch';

export default function AssignTicketModal({ ticketId, onClose, }) {
  const { register, setError, reset, control, formState: { errors } } = useForm()
  const { data: members } = useMembers()

  const [selectedMembers, setSelectedMembers] = useState([])

  const totalMembers = members?.length ?? 0

  const MemberOptions = members?.map(member => ({
    label: `${member.firstName} ${member.lastName}`,
    avatar: member.avatar,
    value: member.id,
    team: member.team,
    ticketsAssigned: member.ticketsAssigned,
    onClick: () => setSelectedMembers(member.id)
  })) || []

  const toggleMember = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const removeMember = (id) => {
    setSelectedMembers(prev => prev.filter(e => e !== id))
  }

  const handleAssignConfirm = () => {
    console.log("Assigning members:", selectedMembers)
    // call your assign mutation here with selectedMembers
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
        disabled={selectedMembers.length === 0}
      >
        <form>
          <div className='w-full'>
            {/* <AssignSearch /> */}
            <SearchInput
              name="search"
              placeholder="Search members or team..."
              register={register}
            />

            {/* Display selected members count and option to clear selection */}
            <div className='flex flex-col items-start gap-1 my-1'>
              <div className='flex flex-wrap items-center gap-1'>
                {MemberOptions.filter(opt => selectedMembers.includes(opt.value)).map(opt => (
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



            <div className='h-52 overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl  border-2 border-gray-100 dark:border-slate-700 flex flex-col divide-y divide-gray-200 dark:divide-slate-700'>
              {MemberOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-gray-700 ${selectedMembers.includes(opt.value)
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : ''
                    }`}
                  onClick={() => toggleMember(opt.value)}
                >
                  {opt.avatar && <img src={opt.avatar} alt={opt.label} className="w-7 h-7 rounded-full mr-2" />}
                  <div className='flex flex-col w-full'>
                    <span className='font-medium text-gray-700'>{opt.label}</span>
                    {opt.team && <span className='first-letter:uppercase font-medium text-[11px] text-gray-400'>{opt.team}</span>}
                  </div>

                  <div className='flex flex-col w-full first-letter:uppercase text-xs text-gray-700'>
                    {opt.ticketsAssigned &&
                      opt.ticketsAssigned > 0 ?
                      <span >{opt.ticketsAssigned} Assigned</span>
                      : <span>0 Assigned</span>}
                  </div>


                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                    ${selectedMembers.includes(opt.value)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {selectedMembers.includes(opt.value) && <LuCheck size={9} className="text-white" strokeWidth={3} />}
                  </div>
                </button>
              ))}
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