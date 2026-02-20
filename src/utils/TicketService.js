im

export const getTickets = () => {
    const data = localStorage.getItem("tickets")
    return data ? JSON.parse(data) : []
}

export const saveTicket = () => {
    const tickets = getTickets()

    const newTicket = {
        ...tickets,
        ticketNumber: `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: ticketData.title,
        description: ticketData.description,
        customerEmail: ticketData.email,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date().toISOString(),
    };
    localStorage.setItem("tickets", JSON.stringify([...tickets, newTicket]))
    return
}