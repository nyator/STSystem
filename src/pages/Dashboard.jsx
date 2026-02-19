import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import Header from '../components/dashboard/Header';

function Dashboard() {
    return (
        <div>
            <div className='sticky top-0 z-10 bg-white p-4 w-full'>
                <Header
                    icon={<LuLayoutDashboard size={20} className="inline mr-2" />}
                    title="Dashboard"
                    description="Overview of tickets and system performance."
                />
            </div>

            <div>
                <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] min-h-screen mt-5 m-2 rounded-2xl'>
                    <h2 className='text-lg font-medium mb-2'>System Overview</h2>
                </div>
            </div>
        </div>
    )
}

export default Dashboard