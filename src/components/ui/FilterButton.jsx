
function FilterButton({ title, icon, isOpen, setIsOpen, onFilterChange, currentFilter, filterType, options }) {
    const handleOptionClick = (value) => {
        onFilterChange(filterType, value)
        setIsOpen(false)

    }
    const isActive = currentFilter !== null && currentFilter !== undefined

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border-2 h-10 px-3 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300 focus:outline-none border-gray-100`}
            >
                {isActive && (
                    <span className="w-2 h-4 bg-blue-500 border-2 border-blue-300 rounded-full absolute top-3 -left-0.5"></span>
                )}
                {icon}
                <span className="font-medium">{title}</span>
            </button>


            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-fit bg-white border-2 border-gray-100 rounded-lg shadow-lg p-2 z-0">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={`w-full text-left text-nowrap flex items-center justify-between px-3 py-2 text-xs rounded-md transition-all ease-in-out duration-300 focus:outline-none ${currentFilter === option.value
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <span>{option.label}</span>
                        </button>
                    ))}
                    {isActive && (
                        <button
                            onClick={() => handleOptionClick(null)}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-all ease-in-out duration-300 mt-1 border-t border-gray-200"
                        >
                            Clear filter
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default FilterButton
