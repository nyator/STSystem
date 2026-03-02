import { useState, useMemo } from "react"

function useSort(data, defaultSort = { key: null, direction: 'asc' }) {
    const [sort, setSort] = useState(defaultSort)
    const sortedData = useMemo(() => {
        if (!data || !Array.isArray(data) || !sort.key) return data || []
        const sorted = [...data].sort((a, b) => {
            let aValue = a[sort.key]
            let bValue = b[sort.key]
            // Handle date
            if (aValue instanceof Date || bValue instanceof Date) {
                aValue = new Date(aValue)
                bValue = new Date(bValue)
            }
            if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1
            if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1
            return 0
        })
        return sorted
    }, [data, sort])

    const handleSort = (key) => {
        setSort(prev => {
            if (prev.key === key) {
                // Toggle direction
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
            }
            return { key, direction: 'asc' }
        })
    }

    const clearSort = () => setSort(defaultSort)

    return { sortedData, sort, setSort: handleSort, clearSort }
}

export default useSort