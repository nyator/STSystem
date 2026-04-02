import { LuSearch, LuTextSelect, LuTextCursorInput } from 'react-icons/lu'

const baseInputClasses = "w-full p-2 text-mblack font-medium text-xs bg-gray-50/50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 h-10 rounded-lg focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600 transition-colors duration-300 dark:text-gray-200"

function SearchInput({ register, error, formfields, ...props }) {
    return (
        <div className="relative">
            <input
                {...register("search", formfields)}
                type='search'
                placeholder='Search Tickets'
                className={`pl-8 ${baseInputClasses}`}
                {...props}
            />
            <LuSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-400" size={15} />
        </div>
    )
}


function FormInputEmpty({ register, readOnly, name, type, placeholder, error, formfields, ...props }) {
    return (
        <div className="relative mb-2">
            <input
                {...register(name, formfields)}
                placeholder={placeholder}
                type={name === "email" ? "email" : "text"}
                className={`text-center ${baseInputClasses} ${error ? "outline-[1.4px] outline-red-500 bg-red-200" : ""}`}
                {...props}
                {...(readOnly && { readOnly })}
            />
        </div>
    )
}
function FormInput({ register, readOnly, name, type, placeholder, error, formfields, icon, ...props }) {
    return (
        <div className="relative mb-2">
            <input
                {...register(name, formfields)}
                placeholder={placeholder}
                type={name === "email" ? "email" : "text"}
                className={`pl-8 ${baseInputClasses} ${error ? "outline-[1.4px] outline-red-500 bg-red-200" : ""} ${readOnly ? "cursor-not-allowed" : ""}`}
                {...props}
                {...(readOnly && { readOnly })}
            />
            {icon ? icon : <LuTextSelect className={`absolute left-3 top-3 text-gray-700 dark:text-gray-400`} size={15} />}
        </div>
    )
}

function FormTextArea({ register, readOnly, name, placeholder, formfields, error, ...props }) {
    return (
        <div className="relative mb-2">
            <textarea
                {...register(name, formfields)}
                placeholder={placeholder}
                className={`${error ? "outline-[1.4px] outline-red-500 bg-red-200" : ""} w-full p-2 pl-8 text-mblack font-medium text-xs bg-gray-50/50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 min-h-18 max-h-42 rounded-lg focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600 transition-colors duration-300 dark:text-gray-200`}
                {...props}
                {...(readOnly && { readOnly })}
            />
            <LuTextCursorInput className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />
        </div>
    )
}

export {
    SearchInput as default,
    FormInputEmpty,
    FormInput,
    FormTextArea
}
