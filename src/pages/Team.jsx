import Header from "../components/dashboard/Header"
import { LuUsersRound  } from "react-icons/lu"

function Team() {
    return (
        <div>
            <div className='sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 w-full'>
                <Header
                    icon={<LuUsersRound  size={20} className="inline" />}
                    title="Team"
                    description="Team members and project assigned to them"
                />
            </div>

            <div>
                <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-1rem)] lg:min-h-[calc(100vh-6rem)] m-2 rounded-2xl'>
                </div>
            </div>
        </div>
    )
}

export default Team