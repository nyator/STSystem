import { getTickets } from "../../utils/TicketService"
import Card from "../ui/Card"


const Cards = () => {

    const tickets = getTickets() || []

    const ticketCards = [
        { id: 3, label: "Critical Tickets", value: tickets.filter(t => (t.priority || '').toLowerCase() === 'high').length, colors: "bg-red-100 text-red-600" },
        { id: 3, label: "In-Progress Tickets", value: tickets.filter(t => (t.status || '').toLowerCase() === 'progress').length, colors: "bg-yellow-50 text-yellow-500" },
        { id: 2, label: "Open Tickets", value: tickets.filter(t => (t.status || '').toLowerCase() === 'open').length, colors: "bg-red-50 text-red-500" },
        { id: 3, label: "Resolved Tickets", value: tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length, colors: "bg-green-50 text-green-500" },
        { id: 1, label: "Total Tickets", value: tickets.length, colors: "bg-blue-50 text-blue-500" },
    ]

    return (
        <div className='flex overflow-x-auto items-center gap-4 w-full border-b-2 border-gray-100 pb-4 mb-4 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-sm'>
            {ticketCards.map((card) => (
                <Card
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