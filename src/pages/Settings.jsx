import Header from "../components/dashboard/Header"
import { LuSettings, LuUserRound } from "react-icons/lu"
import ThemeToggle from "../components/ui/ThemeToggles"
import { useAuth } from "../Hooks/useAuth"
import { getUsers } from "../utils/AuthUtil"

function Settings() {
    const { user } = useAuth()
    const loginUsers = getUsers()

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
                    <div className="w-full space-y-5">
                        <div>
                            <p className=" text-gray-400 dark:text-gray-500 text-md mb-3">Signed in</p>
                            <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 w-fit">
                                <div className="rounded-lg bg-blue-50 dark:bg-blue-900 p-2 text-blue-500">
                                    <LuUserRound size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold dark:text-white">{user.name}</p>
                                    <p className="text-[11px] text-gray-400 capitalize">{user.email} - {user.role}</p>
                                </div>
                            </div>
                        </div>

                        <p className=" text-gray-400 dark:text-gray-500 text-md mb-3">Appearance</p>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-nowrap">Light / Dark Mode</span>
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* <div>
                            <p className=" text-gray-400 dark:text-gray-500 text-md mb-3">Local demo users</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {loginUsers.map((demoUser) => (
                                    <div key={demoUser.id} className="rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-3">
                                        <p className="text-xs font-semibold dark:text-white">{demoUser.name}</p>
                                        <p className="text-[11px] text-gray-400 capitalize">{demoUser.role}</p>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-2">{demoUser.email}</p>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-300">{demoUser.password}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
