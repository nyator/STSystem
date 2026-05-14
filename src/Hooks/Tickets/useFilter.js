import { useState, useMemo } from "react"
import { isWithinInterval, endOfDay, startOfDay } from "date-fns"


function useFilter(tickets) {
    const [filters, setFilters] = useState({
        status: null,
        priority: null,
        category: null,
        assignment: null,
        dateRange: null
    })

    const filteredTickets = useMemo(() => {
        if (!tickets || tickets.length === 0) return []

        let result = [...tickets]

        // Filter by status
        if (filters.status) {
            result = result.filter(ticket =>
                ticket.status?.toLowerCase() === filters.status.toLowerCase()
            )
        }

        // Filter by priority
        if (filters.priority) {
            result = result.filter(ticket =>
                ticket.priority?.toLowerCase() === filters.priority.toLowerCase()
            )
        }

        if (filters.category) {
            result = result.filter(ticket =>
                (ticket.category || "general").toLowerCase() === filters.category.toLowerCase()
            )
        }

        if (filters.assignment === "unassigned") {
            result = result.filter(ticket => !ticket.assignedTo)
        }

        if (filters.assignment === "assigned") {
            result = result.filter(ticket => ticket.assignedTo)
        }

        // Filter by date
        // if (filters.date) {
        //     result = result.sort((a, b) => {
        //         const dateA = new Date(a.createdAt)
        //         const dateB = new Date(b.createdAt)
        //         return filters.date === 'newest' ? dateB - dateA : dateA - dateB
        //     })
        // }


        if (filters.dateRange?.start && filters.dateRange?.end) {
            result = result.filter(ticket => {
                if (!ticket.createdAt) return false
                const ticketDate = new Date(ticket.createdAt)
                return isWithinInterval(ticketDate, {
                    start: startOfDay(filters.dateRange.start),
                    end: endOfDay(filters.dateRange.end)
                })

            })

        }

        return result
    }, [tickets, filters])

    const setFilter = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value === prev[type] ? null : value
        }))
    }

    const clearFilters = () => {
        setFilters({
            status: null,
            priority: null,
            category: null,
            assignment: null,
            // date: null
            dateRange: null
        })
    }

const hasActiveFilters = filters.status || filters.priority || filters.category || filters.assignment || filters.dateRange

    return {
        filteredTickets,
        filters,
        setFilter,
        clearFilters,
        hasActiveFilters
    }
}

export default useFilter
