export const getMembers = () => {
    const data = localStorage.getItem("team")
    const members = data ? JSON.parse(data) : []
    return members
}
export const getMember = (memberId) => {
    return getMembers().find((item) => item.id === memberId) || null
}

export const deleteMembers = (memberId) => {
    const members = getMembers()
    const updated = members.filter((item) => item.id !== memberId)

    localStorage.setItem("team", JSON.stringify(updated))
    return memberId
}

export const updateAssign = (memberId, ticketId) => {
    const members = getMembers()

    const updated = members.map((item) => {
        if (item.id !== memberId) return item

        const currentIds = Array.isArray(item.ticketIDs) ? item.ticketIDs : []
        const ticketIDs = currentIds.includes(ticketId) ? currentIds : [...currentIds, ticketId]

        return {
            ...item,
            ticketIDs,
            ticketsAssigned: ticketIDs.length,
        }
    })

    localStorage.setItem("team", JSON.stringify(updated))
    return updated.find((item) => item.id === memberId)
}

export const createMember = async (memberData) => {
    const members = getMembers()
    const highestId = members.reduce((highest, member) => {
        const match = String(member.id || "").match(/^USR-(\d+)$/)
        return match ? Math.max(highest, Number(match[1])) : highest
    }, 0)
    const nextId = highestId + 1
    const id = `USR-${nextId.toString().padStart(3, '0')}`;

    const newMember = {
        id: id,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        email: memberData.email,
        password: memberData.password || "assignee123",
        avatar: memberData.avatar || `https://i.pravatar.cc/150?img=${nextId}`,
        team: memberData.team || "",
        ticketsAssigned: memberData.ticketsAssigned || 0,
        ticketIDs: memberData.ticketIDs || [],
        createdAt: new Date().toString()
    }

    localStorage.setItem("team", JSON.stringify([...members, newMember]))
    return newMember
}
