
function FilterButton({ title, icon, isOpen, setIsOpen, filterGroups, filters, setFilter, clearFilters, hasActiveFilters, otherActions }) {
    const handleOptionClick = (filterType, value) => {
        setFilter(filterType, value)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800 border-2 h-10 px-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ease-in-out duration-300 focus:outline-none border-gray-100 dark:border-gray-700`}
            >
                {hasActiveFilters && (
                    <span className="w-2 h-4 bg-blue-500 border-2 border-blue-300 rounded-full absolute top-3 -left-0.5"></span>
                )}
                {icon}
                <span className="hidden md:block font-medium">{title}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-38 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-b-lg shadow-lg p-2 max-h-96 overflow-y-auto z-20">
                    {filterGroups.map((group, groupIndex) => (
                        <div key={group.title} className={groupIndex > 0 ? 'border-t border-gray-200 dark:border-gray-700 mt-2 pt-2' : ''}>
                            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1 px-1">{group.title}</div>
                            {group.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleOptionClick(group.filterType, option.value)}
                                    className={`w-full text-left text-nowrap flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all ease-in-out duration-300 focus:outline-none ${filters[group.filterType] === option.value
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

                    {hasActiveFilters && (
                        <button
                            onClick={() => { clearFilters(); setIsOpen(false); }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-b-md transition-all ease-in-out duration-300 mt-2 border-t border-gray-200 dark:border-gray-700"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default FilterButton
