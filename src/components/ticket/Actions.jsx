import { useState, useRef, useEffect } from 'react'
import { LuEllipsis, LuTrash2, LuUserPlus, LuRefreshCcwDot, LuEye, LuMessagesSquare, LuStamp } from 'react-icons/lu'
import { createPortalBody } from '../../utils/createPortal.jsx'

import useTicket from '../../Hooks/Tickets/useTicket.js'

import EditTicketModal from './EditTicketModal'
import DeleteTicketModal from './DeleteTicketModal'
import AssignTicketModal from './AssignTicketModal'
import AddCommentModal from './AddCommentModal.jsx'
import useEditTicket from '../../Hooks/Tickets/useEditTicket'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../Hooks/useAuth.js'
import {
    canAddComment,
    canAssignTicket,
    canCloseTicket,
    canDeleteTicket,
    canMarkResolved,
    canReopenTicket,
    canStartWork,
} from '../../utils/AuthUtil.js'

const EditAction = ({ setOpenModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setOpenModal(true) }}
        className="text-blue-600 bg-blue-50 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 p-1.5 rounded-md transition-all ease-in-out duration-300 cursor-pointer active:scale-[0.9]"
    >
        <LuEye size={15} />
    </button>
)

const OptionsPopover = ({ user, ticket, onDelete, onAssign, onStartWork, onMarkResolved, onCloseTicket, onReopenTicket, onAddComment, rowIndex, dataLength }) => {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({ left: 0, top: 0 })
    const ref = useRef(null)

    const canAssign = canAssignTicket(user, ticket)
    const allowStartWork = canStartWork(user, ticket)
    const allowMarkResolved = canMarkResolved(user, ticket)
    const allowCloseTicket = canCloseTicket(user, ticket)
    const allowReopenTicket = canReopenTicket(user, ticket)
    const allowDelete = canDeleteTicket(user, ticket)
    const allowAddComment = canAddComment(user, ticket)
    const hasActions = canAssign || allowStartWork || allowMarkResolved || allowCloseTicket || allowReopenTicket || allowAddComment || allowDelete

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    const rect = ref.current?.getBoundingClientRect()
                    if (rect) {
                        setPosition({
                            left: rect.right - 139,
                            top: (rowIndex >= dataLength - 4) ? rect.bottom - 153 : rect.bottom + 8,
                        })
                    }
                    setOpen((prev) => !prev)
                }}
                className="text-black bg-gray-50 dark:bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-300 p-1.5 rounded-md transition-all ease-in-out duration-300 cursor-pointer active:scale-[0.9]"
            >
                <LuEllipsis size={15} />
            </button>

            {open && createPortalBody(
                <div onMouseDown={(e) => e.stopPropagation()}
                    className="fixed z-50 flex flex-col left-10 top-full min-w-32 p-3 rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden" style={{ left: `${position.left}px`, top: `${position.top}px` }}>
                            {canAssign && (
                                <button
                                    className="popover-item"
                                    onClick={() => { setOpen(false); onAssign() }}
                                >
                                    <LuUserPlus size={14} /> Assign ticket
                                </button>
                            )}
                            {allowStartWork && (
                                <button
                                    className="popover-item"
                                    onClick={() => { setOpen(false); onStartWork() }}
                                >
                                    <LuRefreshCcwDot size={14} /> Start work
                                </button>
                            )}
                            {allowMarkResolved && (
                                <button
                                    className="popover-item"
                                    onClick={() => { setOpen(false); onMarkResolved() }}
                                >
                                    <LuRefreshCcwDot size={14} /> Mark as resolved
                                </button>
                            )}
                            {allowCloseTicket && (
                                <button
                                    className="popover-item"
                                    onClick={() => { setOpen(false); onCloseTicket() }}
                                >
                                    <LuStamp size={14} /> Close ticket
                                </button>
                            )}
                            {allowReopenTicket && (
                                <button
                                    className="popover-item"
                                    onClick={() => { setOpen(false); onReopenTicket() }}
                                >
                                    <LuRefreshCcwDot size={14} /> Reopen ticket
                                </button>
                            )}

                            {allowAddComment && (
                                <button className="popover-item" onClick={() => { setOpen(false); onAddComment() }}>
                                    <LuMessagesSquare size={14} /> Add Comment
                                </button>
                            )}

                            {!hasActions && (
                                <p className='text-gray-300 text-center'>no actions</p>
                            )}

                            {allowDelete && (
                                <>
                                    <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                                    <button
                                        className="popover-item text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => { setOpen(false); onDelete() }}
                                    >
                                        <LuTrash2 size={14} /> Delete ticket
                                    </button>
                                </>
                            )}
                </div>
            )}
        </div>
    )
}

export default function Actions({ ticketId, rowIndex, dataLength }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAssign, setOpenAssign] = useState(false)
    const [openAddComment, setOpenAddComment] = useState(false)

    const { ticket } = useTicket(ticketId)
    const { updateTicket } = useEditTicket()
    const { reset } = useForm()
    const { user } = useAuth()

    const updateTicketStatus = (status) => {
        if (!ticket || ticket.status === status) return
        updateTicket({ ticketId, status })

    }

    useEffect(() => {
        if (ticket) {
            reset({
                status: ticket.status
            })
        }
    }, [ticket, reset])

    return (
        <>
            <div className="flex gap-2">
                <EditAction setOpenModal={setOpenEdit} />
                <OptionsPopover
                    user={user}
                    ticket={ticket}
                    onDelete={() => setOpenDelete(true)}
                    onAssign={() => setOpenAssign(true)}
                    onStartWork={() => updateTicketStatus('in-progress')}
                    onMarkResolved={() => updateTicketStatus('resolved')}
                    onCloseTicket={() => updateTicketStatus('closed')}
                    onReopenTicket={() => updateTicketStatus('reopened')}
                    onAddComment={() => setOpenAddComment(true)}
                    rowIndex={rowIndex}
                    dataLength={dataLength}
                />
            </div>



            {openEdit && <EditTicketModal ticketId={ticketId} onClose={() => setOpenEdit(false)} />}
            {openDelete && <DeleteTicketModal ticketId={ticketId} onClose={() => setOpenDelete(false)} />}
            {openAssign && <AssignTicketModal ticketId={ticketId} onClose={() => setOpenAssign(false)} />}
            {openAddComment && <AddCommentModal ticketId={ticketId} onClose={() => setOpenAddComment(false)} />}
        </>
    )
}
