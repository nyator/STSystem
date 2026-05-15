import useTickets from "../../Hooks/Tickets/useTickets"
import Card from "../ui/Card"
import { getTicketSlaState } from "../../utils/TicketUtil"


const Cards = () => {
    const { data: tickets = [] } = useTickets()
    const today = new Date().toDateString()
    const resolvedToday = tickets.filter((ticket) => ticket.resolvedAt && new Date(ticket.resolvedAt).toDateString() === today).length
    const resolutionDurations = tickets
        .filter((ticket) => ticket.createdAt && ticket.resolvedAt)
        .map((ticket) => new Date(ticket.resolvedAt) - new Date(ticket.createdAt))
    const averageResolutionHours = resolutionDurations.length
        ? Math.round((resolutionDurations.reduce((sum, duration) => sum + duration, 0) / resolutionDurations.length) / 36e5)
        : 0

    const ticketCards = [
        // { id: 1, label: "High Priority", value: tickets.filter(t => (t.priority || '').toLowerCase() === 'high').length, colors: "bg-red-100 text-red-600" },
        // {
        //     id: 2, label: "Progress Tickets",
        //     value: tickets.filter(t => (t.status || '').toLowerCase() === 'in-progress').length,
        //     colors: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"
        // },
        {
            id: 3, label: "Opened Tickets",
            value: tickets.filter(t => (t.status || '').toLowerCase() === 'open').length,
            colors: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
        },
        {
            id: 4, label: "Resolved Tickets",
            value: tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length,
            colors: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
        },
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
        {
            id: 7, label: "SLA Risk",
            value: tickets.filter(t => ["overdue", "due-soon"].includes(getTicketSlaState(t))).length,
            colors: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300"
        },
        {
            id: 8, label: "Avg Resolution",
            value: averageResolutionHours ? `${averageResolutionHours}h` : "-",
            colors: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
        },
    ]

    return (
        // <div className='bg-amber-500 items-center gap-4 w-full '>
        <div className='mb-4 grid w-full grid-cols-2 items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-800 sm:grid-cols-3 xl:grid-cols-4'>
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
