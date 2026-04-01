export const getMembers = () => {
    const data = localStorage.getItem("team")
    const members = data ? JSON.parse(data) : []
    return members
}
export const getMember = (memberId) => {
    getMembers().find((item) => item.id === memberId) || null
}

export const createMember = async (memberData) => {
    const members = getMembers()
    const nextId = members.length + 1
    const id = `M-${nextId.toString().padStart(3, '0')}`; // Results in M-001, M-002, etc.

    const newMember = {
        id: id,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        // role: memberData.role || "",
        status: memberData.status || "",
        ticketsAssigned: memberData.ticketsAssigned || 0,
        createdAt: new Date().toString()
    }

    localStorage.setItem("team", JSON.stringify([...members, newMember]))
    return newMember
}