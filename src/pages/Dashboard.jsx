import React, { useState } from 'react';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import Header from '../components/dashboard/Header';
import Cards from '../components/dashboard/Cards';
import Table from '../components/ui/Table';
import Chart from '../components/dashboard/Chart';
import Chart3 from '../components/dashboard/Chart3';
import useTickets from '../Hooks/Tickets/useTickets';

import PriorityBadge from '../components/ui/PriorityBadge';
import StatusBadge from '../components/ui/StatusBadge';
import Actions from '../components/ticket/Actions';


function Dashboard() {

    const { data: tickets = [] } = useTickets();
    const filteredData = tickets.filter(t => (t.status || '').toLowerCase() === 'open');

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalItems = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

    return (
        <div>
            <div className='sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 w-full'>
                <Header
                    icon={<LuLayoutDashboard size={20} className="inline" />}
                    title="Dashboard"
                    description="Overview of tickets and system performance."
                />
            </div>

            <div>
                {/* <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-1rem)] lg:min-h-[calc(100vh-6rem)] m-2 rounded-2xl'> */}
                <div className="mr-1">
                    <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-full min-h-[calc(100vh-5.5rem)] m-1 rounded-2xl'>
                        <Cards />
                        <div className='flex flex-col sm:flex-col justify-around w-full mt-1 gap-5 '>
                            <div className='hidden md:flex bg-gray-50/50 dark:bg-gray-900/50 h-fit py-2 rounded-2xl items-center justify-start border-[1.3px] border-[#e5e7eb] dark:border-gray-700'>
                                <div className='w-3/6 flex justify-center items-center  pb-10'>
                                    <Chart />
                                </div>
                                {/* <div className='w-3/6 flex justify-center '>
                                    <Chart3 />
                                </div> */}
                            </div>
                            <div className='w-full relative'>
                                <Table
                                    title="Opened Tickets"
                                    columns={[
                                        { key: 'id', title: 'ID' },
                                        { key: 'title', title: 'Title' },
                                        // { key: 'description', title: 'Description' },
                                        // { key: 'customer', title: 'Customer' },
                                        { key: 'priority', title: 'Priority' },
                                        { key: 'status', title: 'Status' },
                                        { key: 'createdAt', title: 'Created At' },
                                        { key: 'actions', title: 'Actions' },
                                    ]}
                                    data={
                                        paginatedData.map((t) => {
                                            const fmt = (s) => {
                                                if (!s) return '';
                                                const replaced = String(s).replace(/-/g, ' ');
                                                return replaced.charAt(0).toLowerCase() + replaced.slice(1);
                                            };
                                            return {
                                                id: t.id,
                                                title: t.title,
                                                customer: t.customerEmail || '',
                                                // description: t.description || '',
                                                priority: <PriorityBadge priority={fmt(t.priority) || 'low'} />,
                                                status: <StatusBadge status={fmt(t.status) || 'open'} />,
                                                createdAt: t.createdAt ? new Date(t.createdAt).toGMTString().slice(0, -13) : '',
                                                actions: <Actions ticketId={t.id} />
                                            };
                                        })
                                    }
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalItems={totalItems}
                                    onPrev={handlePrev}
                                    onNext={handleNext}
                                    itemLabel="Tickets"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard