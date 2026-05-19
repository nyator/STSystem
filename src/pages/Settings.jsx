import Header from "../components/dashboard/Header"
import { LuSettings, LuUserRound } from "react-icons/lu"
import ThemeToggle from "../components/ui/ThemeToggles"
import { useAuth } from "../Hooks/useAuth"

function Settings() {
    const { user } = useAuth()

    return (
        <div>
            <div className='sticky top-0 z-10 w-full border-b border-gray-200 bg-white p-4 backdrop-blur dark:border-gray-800 dark:bg-[#0f141b]/95'>
                <Header
                    icon={<LuSettings size={16} className="inline" />}
                    title="Settings"
                    description="Account, appearance, and local demo data."
                />
            </div>

            <div>
                <div className='m-2 flex w-[calc(100%-1rem)] flex-col items-start rounded-lg border border-gray-200 bg-white p-4 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none lg:min-h-[calc(100vh-6rem)]'>
                    <div className="w-full space-y-5">
                        <div>
                            <p className=" text-gray-400 dark:text-gray-500 text-md mb-3">Signed in</p>
                            <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950/50">
                                <div className="rounded-md bg-blue-50 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
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
