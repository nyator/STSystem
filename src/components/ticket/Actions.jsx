import { useState, useRef, useEffect } from 'react'
import { LuSquarePen, LuEllipsis, LuTrash2, LuUserPlus, LuLink } from 'react-icons/lu'
import EditTicketModal from './EditTicketModal'
import DeleteTicketModal from './DeleteTicketModal'

const EditAction = ({ setOpenModal }) => (
    <button
        onClick={(e) => { e.stopPropagation(); setOpenModal(true) }}
        className="text-blue-600 bg-blue-50 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 p-1.5 rounded-md transition-all ease-in-out duration-300"
    >
        <LuSquarePen size={15} />
    </button>
)

const OptionsPopover = ({ onDelete }) => {
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

            {open && (
                <div className="absolute flex flex-col right-0 top-full mt-2 z-10 min-w-40 p-3 rounded-b-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                    <button className="popover-item" onClick={() => setOpen(false)}>
                        <LuUserPlus size={14} /> Assign ticket
                    </button>
                    <button className="popover-item" onClick={() => setOpen(false)}>
                        <LuLink size={14} /> Copy link
                    </button>
                    <button className="popover-item" onClick={() => setOpen(false)}>
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
            )}
        </div>
    )
}

export default function Actions({ ticketId }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    return (
        <>
            <div className="flex gap-2">
                <EditAction setOpenModal={setOpenEdit} />
                <OptionsPopover onDelete={() => setOpenDelete(true)} />
            </div>

            {openEdit && <EditTicketModal ticketId={ticketId} onClose={() => setOpenEdit(false)} />}
            {openDelete && <DeleteTicketModal ticketId={ticketId} onClose={() => setOpenDelete(false)} />}
        </>
    )
}