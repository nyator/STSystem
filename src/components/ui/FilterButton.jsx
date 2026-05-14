import { useRef, useEffect } from "react"

function FilterButton({ title, icon, isOpen, setIsOpen, filterGroups, filters, setFilter, clearFilters, hasActiveFilters, otherActions }) {

    const ref = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [setIsOpen])

    const handleOptionClick = (filterType, value) => {
        setFilter(filterType, value)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseDown={(e) => e.stopPropagation()}
                className={`flex h-9 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm shadow-gray-200/40 transition-all duration-200 hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none dark:hover:bg-gray-700`}
            >
                {hasActiveFilters && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-gray-800"></span>
                )}
                {icon}
                <span className="hidden md:block font-medium">{title}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/80 max-h-96 overflow-y-auto dark:border-gray-700 dark:bg-gray-800 dark:shadow-none" onMouseDown={(e) => e.stopPropagation()}>
                    {hasActiveFilters && (
                        <button
                            onClick={() => { clearFilters(); setIsOpen(false); }}
                            className="mb-2 w-full border-b border-gray-100 px-3 py-2 text-left text-xs font-medium text-red-600 transition-all duration-200 hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-500/10"
                        >
                            Clear all filters
                        </button>
                    )}

                    {filterGroups.map((group, groupIndex) => (
                        <div key={group.title} className={groupIndex > 0 ? 'border-t border-gray-200 dark:border-gray-700 pt-2' : ''}>
                            <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">{group.title}</div>
                            {group.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleOptionClick(group.filterType, option.value)}
                                    className={`w-full text-left text-nowrap flex items-center justify-between px-3 py-2 text-xs rounded-md transition-all ease-in-out duration-200 focus:outline-none ${filters[group.filterType] === option.value
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    ))}

                    {otherActions && (
                        <>{otherActions}</>
                    )}


                </div>
            )}
        </div>
    )
}

export default FilterButton
