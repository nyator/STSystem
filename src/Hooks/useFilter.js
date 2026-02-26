import { useState, useMemo } from "react"

function useFilter(tickets) {
    const [filters, setFilters] = useState({
        status: null,
        priority: null,
        date: null
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

        // Filter by date
        if (filters.date) {
            result = result.sort((a, b) => {
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                return filters.date === 'newest' ? dateB - dateA : dateA - dateB
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
            date: null
        })
    }

    const hasActiveFilters = filters.status || filters.priority || filters.date

    return {
        filteredTickets,
        filters,
        setFilter,
        clearFilters,
        hasActiveFilters
    }
}

export default useFilter
