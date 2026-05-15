import { useEffect, useRef, useState } from "react"
import { LuBell } from "react-icons/lu"
import { getNotificationsForUser, markNotificationsRead } from "../../utils/NotificationUtil"
import { useAuth } from "../../Hooks/useAuth"

function NotificationCenter() {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [, setTick] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        const refresh = () => setTick((value) => value + 1)
        window.addEventListener("stsystem-notifications", refresh)
        window.addEventListener("storage", refresh)
        return () => {
            window.removeEventListener("stsystem-notifications", refresh)
            window.removeEventListener("storage", refresh)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const notifications = getNotificationsForUser(user)
    const unreadCount = notifications.filter((notification) => !notification.read).length

    const toggleOpen = () => {
        setOpen((value) => !value)
        if (!open && unreadCount) markNotificationsRead()
    }

    return (
        <div className="relative z-10" ref={ref}>
            <button
                type="button"
                onClick={toggleOpen}
                className="relative rounded-lg border border-gray-100 bg-gray-50/50 p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Notifications"
            >
                <LuBell size={16} />
                {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full z-30 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-700">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-100">Notifications</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto p-2">
                        {notifications.length === 0 ? (
                            <p className="py-6 text-center text-xs text-gray-400">No notifications yet</p>
                        ) : notifications.slice(0, 8).map((notification) => (
                            <div key={notification.id} className="rounded-lg px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{notification.title}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">{notification.message}</p>
                                <p className="mt-1 text-[9px] text-gray-400">
                                    {notification.createdAt ? new Date(notification.createdAt).toUTCString().slice(5, -7) : ""}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationCenter
