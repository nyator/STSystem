import useTickets from "../../Hooks/Tickets/useTickets"
import Card from "../ui/Card"


const Cards = () => {
    const { data: tickets = [] } = useTickets()

    const ticketCards = [
        // { id: 1, label: "Critical Tickets", value: tickets.filter(t => (t.priority || '').toLowerCase() === 'high').length, colors: "bg-red-100 text-red-600" },
        {
            id: 2, label: "Progress Tickets",
            value: tickets.filter(t => (t.status || '').toLowerCase() === 'in-progress').length,
            colors: "bg-yellow-50 text-yellow-500"
        },
        {
            id: 3, label: "Opened Tickets",
            value: tickets.filter(t => (t.status || '').toLowerCase() === 'open').length,
            colors: "bg-red-50 text-red-500"
        },
        {
            id: 4, label: "Resolved Tickets",
            value: tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length,
            colors: "bg-green-50 text-green-500"
        },
        {
            id: 5, label: "Total Tickets",
            value: tickets.length,
            colors: "bg-blue-50 text-blue-500"
        },
    ]

    return (
        // <div className='bg-amber-500 items-center gap-4 w-full '>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center gap-4 w-full border-b-[1.3px] border-[#e5e7eb] pb-4 mb-4'>
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