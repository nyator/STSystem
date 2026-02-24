import { LuTicket, LuCalendarArrowDown, LuCircleCheck, LuShieldCheck } from "react-icons/lu"

import Header from '../components/dashboard/Header';
import FilterButton from '../components/ui/FilterButton';
import Table from '../components/ui/Table';
import Actions from '../components/ticket/Actions';
import StatusBadge from '../components/ui/StatusBadge';
import PriorityBadge from '../components/ui/PriorityBadge';

import useTickets from '../Hooks/useTickets';
import TicketSearch from '../components/ticket/TicketSearch';
import { useState } from "react";

function Ticket() {
    const { data, error, isLoading } = useTickets()
    // const results = useState()


    return (
        <div>
            <div className='sticky top-0 z-10 bg-white p-4 w-full'>
                <Header
                    icon={<LuTicket size={20} className="inline" />}
                    title="Tickets"
                    description="Manage tickets and track performance."
                />
            </div>


            <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] min-h-screen mt-5 m-2 rounded-2xl'>
                <div className=' bg-white flex justify-between items-center gap-2 w-full border-b-2 border-gray-100 mb-5 py-4'>
                    <TicketSearch />

                    <div className='flex items-center gap-2'>
                        <FilterButton
                            title="Date"
                            icon={<LuCalendarArrowDown size={15} />}
                        />
                        <FilterButton
                            title="Priority"
                            icon={<LuShieldCheck size={15} />}
                        />
                        <FilterButton
                            title="Status"
                            icon={<LuCircleCheck size={15} />}
                        />
                    </div>
                </div>
                <Table
                    columns={[
                        { key: 'id', title: 'ID', render: (r) => `${r.id}` },
                        { key: 'title', title: 'Title' },
                        { key: 'customer', title: 'Customer' },
                        { key: 'priority', title: 'Priority' },
                        { key: 'status', title: 'Status' },
                        { key: 'createdAt', title: 'Created At' },
                        { key: 'actions', title: 'Actions' },

                    ]}

                data={
                    (data || []).map((t, i) => {
                        const fmt = (s) => {
                            if (!s) return ''

                            const replaced = String(s).replace(/-/g, ' ')
                            return replaced.charAt(0).toUpperCase() + replaced.slice(1)
                        }

                        return {
                            id: t.id,
                            title: t.title,
                            customer: t.customerEmail || '',
                            description: t.description || '',
                            priority: <PriorityBadge priority={fmt(t.priority) || 'Low'} />,
                            status: <StatusBadge status={fmt(t.status) || 'Open'} />,
                            createdAt: t.createdAt ? new Date(t.createdAt).toLocaleString() : '',
                            actions: <Actions ticketId={t.id} />
                        }
                    })
                }
                />
            </div>
        </div>
    )
}

export default Ticket