import Actions from "./Actions"
import PriorityBadge from "../ui/PriorityBadge"
import StatusBadge from "../ui/StatusBadge"
import { formatLabel, getTicketSlaState } from "../../utils/TicketUtil"

const KANBAN_COLUMNS = [
    { status: "open", title: "Open" },
    { status: "assigned", title: "Assigned" },
    { status: "in-progress", title: "In Progress" },
    { status: "resolved", title: "Resolved" },
]

function TicketKanban({ tickets = [], members = [], onSelectTicket }) {
    return (
        <div className="grid h-[calc(100vh-237px)] w-full grid-cols-1 gap-3 overflow-auto pb-2 md:grid-cols-2 xl:grid-cols-4">
            {KANBAN_COLUMNS.map((column) => {
                const columnTickets = tickets.filter((ticket) => ticket.status === column.status)
                return (
                    <section key={column.status} className="flex min-h-0 h-45 flex-col rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50">
                        <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                                <StatusBadge status={column.status.replace(/-/g, " ")} />
                                <span className="text-[10px] font-semibold text-gray-400">{columnTickets.length}</span>
                            </div>
                            <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{column.title}</p>
                        </div>

                        <div className="flex-1 space-y-2 overflow-y-auto p-2">
                            {columnTickets.length === 0 ? (
                                <p className="py-6 text-center text-xs text-gray-400">No tickets</p>
                            ) : columnTickets.map((ticket) => {
                                const member = members.find((item) => item.id === ticket.assignedTo)
                                const slaState = getTicketSlaState(ticket)
                                return (
                                    <article
                                        key={ticket.id}
                                        onClick={() => onSelectTicket?.(ticket.id)}
                                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm shadow-gray-200/50 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800"
                                    >
                                        <div className="mb-2 flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-semibold text-gray-400">{ticket.id}</p>
                                                <h3 className="line-clamp-2 text-xs font-bold text-gray-800 dark:text-gray-100">{ticket.title}</h3>
                                            </div>
                                            <div onClick={(event) => event.stopPropagation()}>
                                                <Actions ticketId={ticket.id} />
                                            </div>
                                        </div>

                                        <div className="mb-2 flex flex-wrap gap-1">
                                            <PriorityBadge priority={ticket.priority} />
                                            <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium capitalize text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                                                {formatLabel(ticket.category || "general")}
                                            </span>
                                            {slaState !== "none" && (
                                                <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${slaState === "overdue" ? "bg-red-50 text-red-600" : slaState === "due-soon" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"}`}>
                                                    {formatLabel(slaState)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-2 text-[10px] text-gray-400">
                                            <span>{ticket.company || ticket.customerName || ticket.customerEmail || "No customer"}</span>
                                            {member ? (
                                                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-300">
                                                    <img src={member.avatar} className="h-4 w-4 rounded-full" alt="" />
                                                    {member.firstName}
                                                </span>
                                            ) : (
                                                <span>Unassigned</span>
                                            )}
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default TicketKanban
