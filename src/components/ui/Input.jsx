import { LuSearch, LuTextSelect, LuTextCursorInput } from 'react-icons/lu'

const baseInputClasses = "w-full p-2 pl-8 text-mblack font-medium text-xs bg-gray-50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 h-10 rounded-lg focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600 transition-colors duration-300 dark:text-gray-200"

function SearchInput({ register, error, formfields, ...props }) {
    return (
        <div className="relative">
            <input
                {...register("search", formfields)}
                type='search'
                placeholder='Search Tickets'
                className={baseInputClasses}
                {...props}
            />
            <LuSearch className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />
            {error && <span className="text-red-500 text-xs mt-1">{error.message}</span>}
        </div>
    )
}


function FormInput({ register, readOnly, name, placeholder, error, formfields, icon, ...props }) {
    return (
        <div className="relative mb-2">
            <input
                {...register(name, formfields)}
                placeholder={placeholder}
                className={baseInputClasses}
                {...props}
                {...(readOnly && { readOnly })}
            />
            {icon ? icon : <LuTextSelect className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
            {error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
        </div>
    )
}

function FormTextArea({ register, readOnly, name, placeholder, formfields, error, ...props }) {
    return (
        <div className="relative mb-2">
            <textarea
                {...(readOnly && { readOnly })}
                {...register(name, formfields)}
                placeholder={placeholder}
                className="w-full p-2 pl-8 text-mblack font-medium text-xs bg-gray-50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 min-h-28 max-h-42 rounded-lg focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600 transition-colors duration-300 dark:text-gray-200"
                {...props}
            />
            <LuTextCursorInput className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />
            {error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
        </div>
    )
}

export { SearchInput as default, FormInput, FormTextArea }
