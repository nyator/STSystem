const NOTIFICATIONS_KEY = "stsystem_notifications"

export const getNotifications = () => {
    const data = localStorage.getItem(NOTIFICATIONS_KEY)
    const notifications = data ? JSON.parse(data) : []
    return notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const addNotification = ({ title, message, ticketId, targetUserId, type = "ticket" }) => {
    const notifications = getNotifications()
    const notification = {
        id: `N-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title,
        message,
        ticketId,
        targetUserId: targetUserId || null,
        type,
        read: false,
        createdAt: new Date().toISOString(),
    }

    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([notification, ...notifications]))
    window.dispatchEvent(new Event("stsystem-notifications"))
    return notification
}

export const markNotificationsRead = () => {
    const updated = getNotifications().map((notification) => ({ ...notification, read: true }))
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event("stsystem-notifications"))
}

export const getNotificationsForUser = (user) => {
    if (!user) return []
    return getNotifications().filter((notification) => (
        !notification.targetUserId ||
        notification.targetUserId === user.id ||
        notification.targetUserId === user.memberId
    ))
}
