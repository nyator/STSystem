
export const getTickets = () => {
    const data = localStorage.getItem("tickets")
    return data ? JSON.parse(data) : []
}

export const getTicket = (ticketId) => {
    return getTickets().find((item) => item.id === ticketId) || null
}

// export const deleteTicket = (ticketId) => {
//     return getTickets().find((item) => )
// }

export const saveTicket = () => {
    const tickets = getTickets()

    const newTicket = {
        ...tickets,
        id: `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: ticketData.title,
        description: ticketData.description,
        customerEmail: ticketData.email,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date().toISOString(),
    };

    localStorage.setItem("tickets", JSON.stringify([...tickets, newTicket]))
    return newTicket
}