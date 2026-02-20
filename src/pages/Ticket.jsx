import { LuTicket } from 'react-icons/lu';
import Input from '../components/ui/Input';
import Header from '../components/dashboard/Header';
import FilterButton from '../components/ui/FilterButton';
import { LuCalendarArrowDown, LuCircleCheck, LuShieldCheck } from "react-icons/lu"

import { useForm } from 'react-hook-form';
import Table from '../components/ui/Table';

import Actions from '../components/ticket/Actions';
import StatusBadge from '../components/ui/StatusBadge';
import PriorityBadge from '../components/ui/PriorityBadge';

function Ticket() {
    const { register, handleSubmit, formState: { errors } } = useForm()

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
                <div className='flex justify-between items-center gap-2 w-full border-b-2 border-gray-100 pb-4 mb-4'>
                    <Input register={register} error={errors.search} />
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
                    data={[
                        {
                            id: "TK001",
                            title: 'Issue with product',
                            customer: 'Sarah Kenedy',
                            description: "Users report that the login page takes too long to load or doesn't load at all.",
                            priority: <PriorityBadge priority="High" />,
                            status: <StatusBadge status="Open" />,
                            createdAt: '2024-01-01',
                            actions: <Actions />
                        },
                        {
                            id: "TK002",
                            title: 'Payment issue',
                            customer: 'Jane Smith',
                            priority: <PriorityBadge priority="Medium" />,
                            status: <StatusBadge status="In-Progress" />,
                            createdAt: '2024-01-02',
                            actions: <Actions />
                        },
                        {
                            id: "TK003",
                            title: 'Payment issue',
                            customer: 'Jane Smith',
                            priority: <PriorityBadge priority="Low" />,
                            status: <StatusBadge status="Paused" />,
                            createdAt: '2024-01-02',
                            actions: <Actions />
                        },
                    ]}
                />
            </div>


        </div>
    )
}

export default Ticket