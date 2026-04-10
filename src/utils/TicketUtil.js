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


export const assignTicket = (ticketId, assignedTo) => {
    const tickets = getTickets()

    const updated = tickets.map((item) =>
        item.id === ticketId
            ? { ...item, status: "assigned", assignedTo: assignedTo, assignedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
            : item
    )

    localStorage.setItem("tickets", JSON.stringify(updated))
    return updated.find((item) => item.id === ticketId)
}

export const editTicket = (ticketId, ticketData) => {
    const tickets = getTickets()

    const updated = tickets.map((item) =>
        item.id === ticketId
            ? { ...item, ...ticketData, updatedAt: new Date().toISOString() }
            : item
    )

    localStorage.setItem("tickets", JSON.stringify(updated))
    return updated.find((item) => item.id === ticketId)
}


export const createTicket = async (ticketData) => {
    const tickets = getTickets()

    const newTicket = {
        id: `T-${Math.floor(Math.random() * 900) + 100}`,
        title: ticketData.title.trim() || "Untitled",
        description: ticketData.description.trim() || "",
        customerEmail: ticketData.email || "",
        priority: ticketData.priority || "low",
        status: "open",
        createdAt: new Date().toISOString(),
        updatedAt: null,
        assignedTo: ticketData.assignedTo || null,
        assignedAt: ticketData.assignedTo ? new Date().toISOString() : null,
        comments: ticketData.comments || []


    };

    localStorage.setItem("tickets", JSON.stringify([...tickets, newTicket]))
    return newTicket
}

export const STATUS_TRANSITIONS = {
    open: ['assigned'],
    assigned: ['in-progress'],
    'in-progress': ['resolved'],
    resolved: ['closed', 'reopened'],
    reopened: ['in-progress'],
    closed: ['reopened'],
}

export const getAvailableTransitions = (from) =>
    STATUS_TRANSITIONS[from] ?? []
