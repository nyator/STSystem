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

    const updated = members.map(() =>
        item.id === memberId
            ? { ...item, ticketsAssigned: ticketsAssigned++, ticketIDs: [] }
            : item
    )

    localStorage.setItem("members", JSON.stringify(updated))
    return updated.find((item) => item.id === memberId)
}

export const createMember = async (memberData) => {
    const members = getMembers()
    const nextId = members.length + 1
    const id = `USR-${nextId.toString().padStart(3, '0')}`;

    const newMember = {
        id: id,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        email: memberData.email,
        avatar: memberData.avatar || `https://i.pravatar.cc/150?img=${nextId}`,
        team: memberData.team || "",
        ticketsAssigned: memberData.ticketsAssigned || 0,
        ticketIDs: memberData.ticketIDs || null,
        createdAt: new Date().toString()
    }

    localStorage.setItem("team", JSON.stringify([...members, newMember]))
    return newMember
}