import { LuTicketSlash } from "react-icons/lu"

function TicketDrawer({ ticketId, onClose }) {
    return (
        <div className='flex flex-col items-start bg-white dark:bg-gray-800 w-full h-[calc(100vh-5.5rem)] rounded-2xl py-4 px-2 '>
            <div>
                <p className="flex w-full justify-start items-center gap-1 font-medium"><LuTicketSlash size={14} />TicketID</p>
                <h1 className="font-bold">Auto-tagging pipeline failing</h1>
            </div>

            <span className="text-[9px] text-black/40 mt-2">Recent Activities</span>
            <div className="border-l-2 border-gray-100 dark:border-gray-700 p-1 w-full h-full flex flex-col gap-3 overflow-auto text-[10px]">
                <div className="bg-gray-50 border border-gray-100 dark:bg-gray-700/50 rounded-md p-2 w-full min-h-5.5 flex flex-col gap-1 overflow-auto">
                    <p className="font-semibold">Status</p>
                    <div className="border-l-2 border-gray-200 dark:border-gray-700 p-1 w-full h-full flex flex-col gap-3 overflow-auto text-[10px]">
                        <p>Changed status from <span className="font-semibold text-black/60">"Open"</span> to <span className="font-semibold text-black/60">"In Progress"</span> by @<span className="font-semibold text-black underline">Member 1</span> </p>
                    </div>
                    <p className="text-[9px] text-black/40">21 Jan 2026 , 10:30 AM</p>

                </div>

                <div className="bg-gray-50 border border-gray-100 dark:bg-gray-700/50 rounded-md p-2 w-full min-h-5.5 flex flex-col gap-1 overflow-auto">
                    <p className="font-semibold">Status</p>
                    <div className="border-l-2 border-gray-200 dark:border-gray-700 p-1 w-full h-full flex flex-col gap-3 overflow-auto text-[10px]">
                        <p>Changed status from <span className="font-semibold text-black/60">"Open"</span> to <span className="font-semibold text-black/60">"In Progress"</span> by @<span className="font-semibold text-black underline">Member 1</span> </p>
                    </div>
                    <p className="text-[9px] text-black/40">21 Jan 2026 , 10:30 AM</p>

                </div>

                <div className="bg-gray-50 border border-gray-100 dark:bg-gray-700/50 rounded-md p-2 w-full min-h-5.5 flex flex-col gap-1 overflow-auto">
                    <p className="font-semibold">Status</p>
                    <div className="border-l-2 border-gray-200 dark:border-gray-700 p-1 w-full h-full flex flex-col gap-3 overflow-auto text-[10px]">
                        <p>Changed status from <span className="font-semibold text-black/60">"Open"</span> to <span className="font-semibold text-black/60">"In Progress"</span> by @<span className="font-semibold text-black underline">Member 1</span> </p>
                    </div>
                    <p className="text-[9px] text-black/40">21 Jan 2026 , 10:30 AM</p>

                </div>
            </div>
        </div>)
}

export default TicketDrawer