import { LuPanelRightClose, LuTicketSlash } from "react-icons/lu"
import useTicket from "../../Hooks/Tickets/useTicket"
import useMembers from "../../Hooks/Team/useMembers"
import StatusBadge from "../ui/StatusBadge"
import PriorityBadge from "../ui/PriorityBadge"
import CommentList from "./CommentList"
import TicketAssigneeRow from "./TicketAssigneeRow"
import ActivityTimeline from "./ActivityTimeline"
import { formatLabel, getTicketSlaState } from "../../utils/TicketUtil"

function TicketDrawer({ ticketId, onClose }) {
    const { ticket } = useTicket(ticketId)
    const { data: members } = useMembers()

    if (!ticketId) {
        return (
            <div className="hidden h-[calc(100vh-5.5rem)] w-80 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-400 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none xl:flex">
                <LuTicketSlash size={28} className="mb-2 opacity-50" />
                <p className="text-xs font-medium">Select a ticket to preview details</p>
            </div>
        )
    }

    if (!ticket) return null

    const slaState = getTicketSlaState(ticket)

    return (
        <aside className="hidden h-[calc(100vh-5.5rem)] w-88 shrink-0 flex-col rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none xl:flex">
            <div className="mb-3 flex items-start justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-700">
                <div className="min-w-0">
                    <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase text-gray-400">
                        <LuTicketSlash size={13} />
                        {ticket.id}
                    </p>
                    <h2 className="line-clamp-2 text-sm font-bold text-gray-900 dark:text-white">{ticket.title}</h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-200 bg-white p-2 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    aria-label="Close ticket preview"
                >
                    <LuPanelRightClose size={15} />
                </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                <div className="flex flex-wrap gap-2">
                    <PriorityBadge priority={ticket.priority} />
                    <StatusBadge status={formatLabel(ticket.status).toLowerCase()} />
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold capitalize text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                        {formatLabel(ticket.category || "general")}
                    </span>
                    {slaState !== "none" && (
                        <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${slaState === "overdue" ? "bg-red-50 text-red-600" : slaState === "due-soon" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"}`}>
                            {formatLabel(slaState)}
                        </span>
                    )}
                </div>

                <TicketAssigneeRow members={members} assignedTo={ticket.assignedTo} />

                <section>
                    <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">Customer</p>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{ticket.customerName || ticket.customerEmail || "N/A"}</p>
                    {ticket.company && <p className="text-[10px] text-gray-400">{ticket.company}</p>}
                </section>

                <section>
                    <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">Description</p>
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">{ticket.description || "No description"}</p>
                </section>

                <section>
                    <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">Comments</p>
                    <CommentList comments={ticket.comments} maxHeightClass="max-h-36" />
                </section>

                <section>
                    <p className="mb-1 text-[10px] font-semibold uppercase text-gray-400">Activity</p>
                    <ActivityTimeline activity={ticket.activity} />
                </section>
            </div>
        </aside>
    )
}

export default TicketDrawer
