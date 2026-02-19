import { useState } from "react"
import SelectMenu from "./SelectMenu"

function FilterButton({ title, icon }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border-2 border-gray-100 h-10 px-3 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300 focus:outline-none">
                {icon}
                <span className="font-medium">{title}</span>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-40 bg-white border-2 border-gray-100 rounded-lg shadow-lg p-2 z-20">
                    <SelectMenu />
                </div>
            )}
        </div>
    )
}

export default FilterButton