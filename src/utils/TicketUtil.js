import { getLocalStorage } from "../Hooks/useLocalStorage"

export const getTickets = () => {
    const data = localStorage.getItem("tickets")
    const tickets = data ? JSON.parse(data) : []
    return tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const getTicket = (ticketId) => {
    return getTickets().find((item) => item.id === ticketId) || null
}

export const deleteTicket = (ticketId) => {
    const tickets = getTickets()

    const updated = tickets.filter((item) => item.id !== ticketId)

    localStorage.setItem("tickets", JSON.stringify(updated))
    return ticketId
}

export const editTicket = (ticketId, ticketData) => {
    const tickets = getTickets()

    const updated = tickets.map((item) =>
        item.id === ticketId ? { ...item, ...ticketData } : item
    )

    localStorage.setItem("tickets", JSON.stringify(updated))
    return updated.find((item) => item.id === ticketId)
}

export const createTicket = async (ticketData) => {
    const tickets = getTickets()

    const newTicket = {
        id: `T-${Math.floor(Math.random() * 900) + 100}`,
        title: ticketData.title || "Untitled",
        description: ticketData.description || "",
        customerEmail: ticketData.email || "",
        priority: ticketData.priority || "low",
        status: "open",
        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
        assignedTo: ticketData.assignedTo || null,
        assignedAt: ticketData.assignedTo || null,
        comments: [
            {
                message: ticketData.comments.message || "",
                author: ticketData.comments.author || "",
                createdAt: new Date().toISOString()
            }
        ]
    };

    localStorage.setItem("tickets", JSON.stringify([...tickets, newTicket]))
    return newTicket
}