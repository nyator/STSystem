import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import Header from '../components/dashboard/Header';
import Cards from '../components/dashboard/Cards';
import Table from '../components/ui/Table';
import Chart from '../components/dashboard/Chart';
import useTickets from '../Hooks/useTickets';

import PriorityBadge from '../components/ui/PriorityBadge';
import Actions from '../components/ticket/Actions';



function Dashboard() {
    const { data: tickets = [] } = useTickets()
    const filteredData = tickets.filter(t => (t.status || '').toLowerCase() === 'open')

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
                <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] min-h-screen m-2 rounded-2xl'>
                    <Cards />

                    <div className='flex flex-col lg:flex-row justify-around w-full mt-5 gap-5'>
                        <div className='lg:w-3/5'>
                            <Table
                                title="Opened Tickets"
                                columns={[
                                    { key: 'id', title: 'ID', render: (r) => `${r.id}` },
                                    { key: 'title', title: 'Title' },
                                    { key: 'priority', title: 'Priority' },
                                    { key: 'createdAt', title: 'Created At' },
                                    { key: 'actions', title: 'Actions' },
                                ]}

                                data={
                                    (filteredData || []).map((t) => {
                                        const fmt = (s) => {
                                            if (!s) return ''

                                            const replaced = String(s).replace(/-/g, ' ')
                                            return replaced.charAt(0).toUpperCase() + replaced.slice(1)
                                        }
                                        return {
                                            id: t.id,
                                            title: t.title,
                                            priority: <PriorityBadge priority={fmt(t.priority) || 'Low'} />, createdAt: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '',
                                            actions: <Actions ticketId={t.id} />
                                        }
                                    })
                                }
                            />
                        </div>
                        <div className='lg:w-2/5 lg:mt-5 bg-gray-50 h-fit p-3 rounded-2xl'>
                            <Chart />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard