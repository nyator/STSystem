import useTickets from "../../Hooks/Tickets/useTickets"
import Card from "../ui/Card"
import { getTicketSlaState } from "../../utils/TicketUtil"
import { useAuth } from "../../Hooks/useAuth"
import { ROLES } from "../../utils/AuthUtil"


const Cards = () => {
    const { data: tickets = [] } = useTickets()
    const { user } = useAuth()
    const today = new Date().toDateString()
    const resolvedToday = tickets.filter((ticket) => ticket.resolvedAt && new Date(ticket.resolvedAt).toDateString() === today).length
    const resolutionDurations = tickets
        .filter((ticket) => ticket.createdAt && ticket.resolvedAt)
        .map((ticket) => new Date(ticket.resolvedAt) - new Date(ticket.createdAt))
    const averageResolutionHours = resolutionDurations.length
        ? Math.round((resolutionDurations.reduce((sum, duration) => sum + duration, 0) / resolutionDurations.length) / 36e5)
        : 0

    const openCount = tickets.filter(t => (t.status || '').toLowerCase() === 'open').length
    const resolvedCount = tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length
    const inProgressCount = tickets.filter(t => (t.status || '').toLowerCase() === 'in-progress').length
    const activeAssigneeCount = tickets.filter(t => ["assigned", "in-progress", "reopened"].includes((t.status || "").toLowerCase())).length
    const slaRiskCount = tickets.filter(t => ["overdue", "due-soon"].includes(getTicketSlaState(t))).length

    const sharedCards = [
        {
            id: 3, label: user?.role === ROLES.CLIENT ? "My Open Requests" : "Open Tickets",
            value: openCount,
            colors: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
        },
        {
            id: 4, label: user?.role === ROLES.CLIENT ? "Resolved Requests" : "Resolved Tickets",
            value: resolvedCount,
            colors: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
        },
        {
            id: 7, label: "SLA Risk",
            value: slaRiskCount,
            colors: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300"
        },
        // {
        //     id: 8, label: "Avg Resolution",
        //     value: averageResolutionHours ? `${averageResolutionHours}h` : "-",
        //     colors: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
        // },
    ]

    const adminCards = [
        ...sharedCards,
        {
            id: 5, label: "Unassigned",
            value: tickets.filter(t => !t.assignedTo).length,
            colors: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300"
        },
        {
            id: 6, label: "Resolved Today",
            value: resolvedToday,
            colors: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300"
        },
    ]

    const assigneeCards = [
        {
            id: 1, label: "Assigned To Me",
            value: activeAssigneeCount,
            colors: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300"
        },
        {
            id: 2, label: "In Progress",
            value: inProgressCount,
            colors: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"
        },
        ...sharedCards,
    ]

    const clientCards = [
        {
            id: 1, label: "My Requests",
            value: tickets.length,
            colors: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300"
        },
        ...sharedCards,
    ]

    const ticketCards = user?.role === ROLES.ADMIN
        ? adminCards
        : user?.role === ROLES.ASSIGNEE
            ? assigneeCards
            : clientCards

    return (
        // <div className='bg-amber-500 items-center gap-4 w-full '>
        <div className='mb-4 grid w-full grid-cols-2 items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-800 sm:grid-cols-4 xl:grid-cols-6'>
            {ticketCards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    label={card.label}
                    value={card.value}
                    colors={card.colors}
                />
            ))}
        </div>
    )
}

export default Cards
