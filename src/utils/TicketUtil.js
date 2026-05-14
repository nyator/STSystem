export const TICKET_CATEGORIES = ["bug", "feature", "billing", "account", "general"]
export const SLA_HOURS_BY_PRIORITY = {
    high: 24,
    medium: 72,
    low: 120,
}

const actorName = (actor) => actor?.name || actor?.email || "System"

export const formatLabel = (value) =>
    String(value || "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())

export const addHours = (date, hours) => {
    const next = new Date(date)
    next.setHours(next.getHours() + hours)
    return next.toISOString()
}

export const getDueDateForPriority = (priority = "low", createdAt = new Date().toISOString()) =>
    addHours(createdAt, SLA_HOURS_BY_PRIORITY[priority] || SLA_HOURS_BY_PRIORITY.low)

export const getTicketSlaState = (ticket) => {
    if (!ticket?.dueAt || ["resolved", "closed"].includes(ticket.status)) return "none"

    const dueAt = new Date(ticket.dueAt).getTime()
    const now = Date.now()
    const hoursLeft = (dueAt - now) / 36e5

    if (hoursLeft < 0) return "overdue"
    if (hoursLeft <= 24) return "due-soon"
    return "on-track"
}

export const createActivity = ({ type, message, actor, meta = {} }) => ({
    id: `ACT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type,
    message,
    actor: actorName(actor),
    actorId: actor?.id || actor?.memberId || null,
    createdAt: new Date().toISOString(),
    meta,
})

const normalizeTicket = (ticket) => {
    const createdAt = ticket.createdAt || new Date().toISOString()
    const priority = ticket.priority || "low"
    const activity = Array.isArray(ticket.activity) && ticket.activity.length
        ? ticket.activity
        : [
            {
                id: `ACT-${ticket.id || "ticket"}-created`,
                type: "created",
                message: "Ticket created",
                actor: ticket.customerEmail || "System",
                actorId: ticket.createdBy || null,
                createdAt,
                meta: {},
            },
        ]

    return {
        category: "general",
        customerName: "",
        company: "",
        dueAt: getDueDateForPriority(priority, createdAt),
        resolvedAt: null,
        closedAt: null,
        ...ticket,
        createdAt,
        priority,
        comments: Array.isArray(ticket.comments) ? ticket.comments : [],
        tags: Array.isArray(ticket.tags)
            ? ticket.tags
            : String(ticket.tags || "")
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        activity,
    }
}

export const getTickets = () => {
    const data = localStorage.getItem("tickets")
    const tickets = data ? JSON.parse(data) : []
    return tickets.map(normalizeTicket).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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


export const assignTicket = (ticketId, assignedTo, actor) => {
    const tickets = getTickets()
    const previousTicket = tickets.find((item) => item.id === ticketId)

    const updated = tickets.map((item) =>
        item.id === ticketId
            ? {
                ...item,
                status: "assigned",
                assignedTo: assignedTo,
                assignedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                activity: [
                    ...(item.activity || []),
                    createActivity({
                        type: "assignment",
                        actor,
                        message: `Assigned ticket to ${assignedTo}`,
                        meta: { assignedTo },
                    }),
                ],
            }
            : item
    )

    localStorage.setItem("tickets", JSON.stringify(updated))

    const membersData = localStorage.getItem("team")
    const members = membersData ? JSON.parse(membersData) : []
    const updatedMembers = members.map((member) => {
        const currentIds = Array.isArray(member.ticketIDs) ? member.ticketIDs : []
        const withoutTicket = currentIds.filter((id) => id !== ticketId)
        const ticketIDs = member.id === assignedTo ? [...withoutTicket, ticketId] : withoutTicket

        if (member.id === previousTicket?.assignedTo || member.id === assignedTo) {
            return {
                ...member,
                ticketIDs,
                ticketsAssigned: ticketIDs.length,
            }
        }

        return member
    })
    localStorage.setItem("team", JSON.stringify(updatedMembers))

    return updated.find((item) => item.id === ticketId)
}

export const editTicket = (ticketId, ticketData) => {
    const tickets = getTickets()
    const actor = ticketData.actor
    const cleanTicketData = { ...ticketData }
    delete cleanTicketData.actor
    const explicitActivity = Array.isArray(cleanTicketData.activity) ? cleanTicketData.activity : null
    delete cleanTicketData.activity

    const updated = tickets.map((item) => {
        if (item.id !== ticketId) return item

        const changes = []
        if (cleanTicketData.status && cleanTicketData.status !== item.status) {
            changes.push(createActivity({
                type: "status",
                actor,
                message: `Changed status from ${formatLabel(item.status)} to ${formatLabel(cleanTicketData.status)}`,
                meta: { from: item.status, to: cleanTicketData.status },
            }))
        }
        if (cleanTicketData.priority && cleanTicketData.priority !== item.priority) {
            changes.push(createActivity({
                type: "priority",
                actor,
                message: `Changed priority from ${formatLabel(item.priority)} to ${formatLabel(cleanTicketData.priority)}`,
                meta: { from: item.priority, to: cleanTicketData.priority },
            }))
        }

        const nextStatus = cleanTicketData.status || item.status
        const now = new Date().toISOString()
        return {
            ...item,
            ...cleanTicketData,
            updatedAt: now,
            resolvedAt: nextStatus === "resolved" && !item.resolvedAt ? now : item.resolvedAt,
            closedAt: nextStatus === "closed" && !item.closedAt ? now : item.closedAt,
            activity: explicitActivity || [...(item.activity || []), ...changes],
        }
    })

    localStorage.setItem("tickets", JSON.stringify(updated))
    return updated.find((item) => item.id === ticketId)
}


export const createTicket = async (ticketData) => {
    const tickets = getTickets()
    const createdAt = new Date().toISOString()
    const priority = ticketData.priority || "low"
    const tags = String(ticketData.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

    const newTicket = {
        id: `T-${Math.floor(Math.random() * 900) + 100}`,
        title: ticketData.title.trim() || "Untitled",
        description: ticketData.description.trim() || "",
        customerEmail: ticketData.email || "",
        customerName: ticketData.customerName || "",
        company: ticketData.company || "",
        category: ticketData.category || "general",
        tags,
        priority,
        status: "open",
        createdBy: ticketData.createdBy || null,
        createdAt,
        dueAt: ticketData.dueAt || getDueDateForPriority(priority, createdAt),
        updatedAt: null,
        assignedTo: ticketData.assignedTo || null,
        assignedAt: ticketData.assignedTo ? new Date().toISOString() : null,
        comments: ticketData.comments || [],
        activity: [
            createActivity({
                type: "created",
                actor: ticketData.actor || { id: ticketData.createdBy, name: ticketData.email },
                message: "Ticket created",
            }),
        ],


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
