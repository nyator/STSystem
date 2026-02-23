import Card from "../ui/Card"

const ticketCards = [
    { id: 1, label: "Total Tickets", value: 500, colors: "bg-blue-50 text-blue-500" },
    { id: 2, label: "Open Tickets", value: 200, colors: "bg-red-50 text-red-500" },
    { id: 3, label: "Resolved Tickets", value: 100, colors: "bg-green-50 text-green-500" },
]

const Cards = () => {
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