import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import Header from '../components/dashboard/Header';
import Cards from '../components/dashboard/Cards';
import Table from '../components/ui/Table';

function Dashboard() {
    return (
        <div>
            <div className='sticky top-0 z-10 bg-white p-4 w-full'>
                <Header
                    icon={<LuLayoutDashboard size={20} className="inline" />}
                    title="Dashboard"
                    description="Overview of tickets and system performance."
                />
            </div>

            <div>
                <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] min-h-screen mt-5 m-2 rounded-2xl'>
                    <Cards />

                    <Table
                        title="Open Tickets"
                        columns={[
                            { key: 'id', title: 'ID', render: (r) => `${r.id}` },
                            { key: 'title', title: 'Title' },
                            { key: 'customer', title: 'Customer' },
                            { key: 'priority', title: 'Priority' },
                            { key: 'status', title: 'Status' },
                            { key: 'createdAt', title: 'Created At' },
                            { key: 'actions', title: 'Actions' },

                        ]} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard