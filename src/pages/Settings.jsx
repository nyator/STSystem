import Header from "../components/dashboard/Header"
import { LuSettings } from "react-icons/lu"
import ThemeToggle from "../components/ui/ThemeToggles"
function Settings() {
    return (
        <div>
            <div className='sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 w-full'>
                <Header
                    icon={<LuSettings size={20} className="inline" />}
                    title="Setting"
                    description="Team members and project assigned to them"
                />
            </div>

            <div>
                <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-1rem)] lg:min-h-[calc(100vh-6rem)] m-2 rounded-2xl'>
                    <div>
                        <p className=" text-gray-400 dark:text-gray-500 text-md mb-3">Appearance</p>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-nowrap">Light / Dark Mode</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings