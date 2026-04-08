import { useState, useRef, useEffect } from 'react'
import { LuSquarePen, LuEllipsis, LuTrash2, LuUserPlus } from 'react-icons/lu'
import { createPortalBody } from '../../utils/createPortal.jsx'


import useTicket from '../../Hooks/Tickets/useTicket.js'

import EditTicketModal from './EditTicketModal'
import DeleteTicketModal from './DeleteTicketModal'
import AssignTicketModal from './AssignTicketModal'
// import ChangeStatusModal from './ChangeStatusModal'

const EditAction = ({ setOpenModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setOpenModal(true) }}
        className="text-blue-600 bg-blue-50 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 p-1.5 rounded-md transition-all ease-in-out duration-300 cursor-pointer"
    >
        <LuSquarePen size={15} />
    </button>
)

const OptionsPopover = ({ onDelete, onAssign, onChangeStatus, rowIndex, dataLength }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

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
                onClick={(e) => { e.stopPropagation(); setOpen((prev) => !prev) }}
                className="text-black bg-gray-50 dark:bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-300 p-1.5 rounded-md transition-all ease-in-out duration-300"
            >
                <LuEllipsis size={15} />
            </button>

            {open && createPortalBody(
                (() => {
                    const rect = ref.current?.getBoundingClientRect();
                    const topPosition = (rowIndex >= dataLength - 4)
                        ? `${rect.bottom - 137.5}px`
                        : `${rect.bottom + 8}px`;
                    return (
                        <div onMouseDown={(e) => e.stopPropagation()}
                            className="fixed z-50 flex flex-col left-10 top-full min-w-32 p-3 rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden" style={{ left: `${rect.right - 139}px`, top: topPosition }}>

                            <button
                                className="popover-item"
                                onClick={() => { setOpen(false); onAssign() }}
                            >
                                <LuUserPlus size={14} /> Assign ticket
                            </button>
                            <button className="popover-item" onClick={() => { setOpen(false); onChangeStatus() }}>
                                <LuTrash2 size={14} /> Change status
                            </button>
                            <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                            <button
                                className="popover-item text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => { setOpen(false); onDelete() }}
                            >
                                <LuTrash2 size={14} /> Delete ticket
                            </button>
                        </div>
                    );
                })()
            )}
        </div>
    )
}

export default function Actions({ ticketId, rowIndex, dataLength }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAssign, setOpenAssign] = useState(false)
    const [openChangeStatus, setOpenChangeStatus] = useState(false)


    return (
        <>
            <div className="flex gap-2">
                <EditAction setOpenModal={setOpenEdit} />
                <OptionsPopover
                    onDelete={() => setOpenDelete(true)}
                    onAssign={() => setOpenAssign(true)}
                    onChangeStatus={() => setOpenChangeStatus(true)}
                    rowIndex={rowIndex}
                    dataLength={dataLength}
                />
            </div>



            {openEdit && <EditTicketModal ticketId={ticketId} onClose={() => setOpenEdit(false)} />}
            {openDelete && <DeleteTicketModal ticketId={ticketId} onClose={() => setOpenDelete(false)} />}
            {openAssign && <AssignTicketModal ticketId={ticketId} onClose={() => setOpenAssign(false)} />}
            {/* {openChangeStatus && <ChangeStatusModal ticketId={ticketId} onClose={() => setOpenChangeStatus(false)} />} */}
            {openChangeStatus && <EditTicketModal ticketId={ticketId} onClose={() => setOpenChangeStatus(false)} />}
        </>
    )
}