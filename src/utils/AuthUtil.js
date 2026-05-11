import { getLocalStorage, setLocalStorage } from "../Hooks/useLocalStorage"

export const AUTH_USERS_KEY = "stsystem_users"
export const AUTH_SESSION_KEY = "stsystem_session"

export const ROLES = {
    CLIENT: "client",
    ADMIN: "admin",
    ASSIGNEE: "assignee",
}

export const DEFAULT_ASSIGNEE_PASSWORD = "assignee123"

const BASE_USERS = [
    {
        id: "CLIENT-001",
        name: "Client User",
        email: "client@gmail.com",
        password: "client123",
        role: ROLES.CLIENT,
    },
    {
        id: "ADMIN-001",
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123",
        role: ROLES.ADMIN,
    },
]

const DEFAULT_TEAM_MEMBER = {
    id: "USR-001",
    firstName: "Assignee",
    lastName: "User",
    email: "assignee@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    team: "frontend",
    ticketsAssigned: 0,
    ticketIDs: [],
    createdAt: new Date().toString(),
}

const memberToAssigneeUser = (member, existingUser) => ({
    id: member.id,
    memberId: member.id,
    name: `${member.firstName || ""} ${member.lastName || ""}`.trim() || member.email,
    email: member.email,
    password: existingUser?.password || member.password || DEFAULT_ASSIGNEE_PASSWORD,
    role: ROLES.ASSIGNEE,
})

export const DEMO_USERS = [
    ...BASE_USERS,
    memberToAssigneeUser(DEFAULT_TEAM_MEMBER),
]

const sessionUser = (user) => {
    return {
        id: user.id,
        memberId: user.memberId,
        name: user.name,
        email: user.email,
        role: user.role,
    }
}

export function ensureDefaultAuthData() {
    let team = getLocalStorage("team")
    if (!Array.isArray(team) || team.length === 0) {
        team = [DEFAULT_TEAM_MEMBER]
        setLocalStorage("team", team)
    }

    const storedUsers = getLocalStorage(AUTH_USERS_KEY)
    const existingUsers = Array.isArray(storedUsers) ? storedUsers : []
    const baseUsers = BASE_USERS.map((baseUser) => {
        const existingUser = existingUsers.find((user) => user.id === baseUser.id || user.email === baseUser.email)
        return existingUser ? { ...baseUser, password: existingUser.password || baseUser.password } : baseUser
    })

    const assigneeUsers = team
        .filter((member) => member.id && member.email)
        .map((member) => {
            const existingUser = existingUsers.find((user) => user.memberId === member.id || user.id === member.id || user.email === member.email)
            return memberToAssigneeUser(member, existingUser)
        })

    setLocalStorage(AUTH_USERS_KEY, [...baseUsers, ...assigneeUsers])
}

export function getUsers() {
    ensureDefaultAuthData()
    return getLocalStorage(AUTH_USERS_KEY) || []
}

export function getSession() {
    ensureDefaultAuthData()
    return getLocalStorage(AUTH_SESSION_KEY)
}

export function loginWithCredentials(email, password) {
    const user = getUsers().find((item) => (
        item.email.toLowerCase() === email.trim().toLowerCase()
        && item.password === password
    ))

    if (!user) {
        throw new Error("Invalid email or password")
    }

    const session = sessionUser(user)
    setLocalStorage(AUTH_SESSION_KEY, session)
    return session
}

export function logoutSession() {
    localStorage.removeItem(AUTH_SESSION_KEY)
}

export function canViewTicket(user, ticket) {
    if (!user || !ticket) return false
    if (user.role === ROLES.ADMIN) return true
    if (user.role === ROLES.CLIENT) {
        return !ticket.createdBy || ticket.createdBy === user.id || ticket.customerEmail === user.email
    }
    if (user.role === ROLES.ASSIGNEE) {
        return ticket.assignedTo === user.memberId
    }
    return false
}

export function canCreateTicket(user) {
    return [ROLES.CLIENT, ROLES.ADMIN].includes(user?.role)
}

export function canManageTeam(user) {
    return user?.role === ROLES.ADMIN
}

export function canAssignTicket(user, ticket) {
    return user?.role === ROLES.ADMIN && ticket?.status === "open" && !ticket?.assignedTo
}

export function canDeleteTicket(user, ticket) {
    return user?.role === ROLES.ADMIN && ticket?.status === "closed"
}

export function canStartWork(user, ticket) {
    if (!ticket || !["assigned", "reopened"].includes(ticket.status)) return false
    if (user?.role === ROLES.ADMIN) return false // Admins cannot start work, only assignees can
    return user?.role === ROLES.ASSIGNEE && ticket.assignedTo === user.memberId
}

export function canMarkResolved(user, ticket) {
    if (ticket?.status !== "in-progress") return false
    if (user?.role === ROLES.ADMIN) return false // Admins cannot mark tickets as resolved, only assignees can
    return user?.role === ROLES.ASSIGNEE && ticket.assignedTo === user.memberId
}

export function canCloseTicket(user, ticket) {
    return [ROLES.CLIENT, ROLES.ADMIN].includes(user?.role) && ticket?.status === "resolved"
}

export function canReopenTicket(user, ticket) {
    return [ROLES.CLIENT, ROLES.ADMIN].includes(user?.role) && ticket?.status === "resolved"
}

export function canAddComment(user, ticket) {
    return canViewTicket(user, ticket) && ticket?.status !== "closed"
}
