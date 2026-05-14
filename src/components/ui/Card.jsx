import { LuTicket } from 'react-icons/lu'

function Card({ label, value, colors, id }) {
    return (
        <div key={id} className="group w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm shadow-gray-200/60 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-gray-700">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-2xl font-semibold tracking-normal text-gray-950 dark:text-white">{value}</p>
                    <h3 className="mt-1 text-xs font-medium leading-4 text-gray-500 dark:text-gray-400">{label}</h3>
                </div>
                <div className={`${colors ? colors : "bg-blue-50 text-blue-600"} rounded-md p-2`}>
                <LuTicket size={16} className="inline" />
                </div>
            </div>
        </div>
    )
}

export default Card
