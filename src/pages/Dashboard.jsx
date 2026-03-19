import React, { useState } from 'react';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import Header from '../components/dashboard/Header';
import Cards from '../components/dashboard/Cards';
import Table from '../components/ui/Table';
import Chart from '../components/dashboard/Chart';
import useTickets from '../Hooks/Tickets/useTickets';

import PriorityBadge from '../components/ui/PriorityBadge';
import Actions from '../components/ticket/Actions';
import Chart2 from '../components/dashboard/Chart2';



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
                <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-1rem)] lg:min-h-[calc(100vh-6rem)] m-2 rounded-2xl'>
                    <Cards />
                    <div className='flex flex-col sm:flex-col justify-around w-full mt-1 gap-5 '>
                        <div className='hidden md:flex bg-gray-50/50 dark:bg-gray-900 h-fit p-3 rounded-2xl items-center justify-center border-[1.3px] border-[#e5e7eb]'>
                            <div className='w-2/5 '>
                                <Chart />
                            </div>
                            <div className='w-2/5 '>
                                <Chart2 />
                            </div>
                        </div>
                        <div className='w-full mt-10'>
                            <Table
                                title="Opened Tickets"
                                columns={[
                                    { key: 'id', title: 'ID' },
                                    { key: 'title', title: 'Title' },
                                    { key: 'priority', title: 'Priority' },
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
                                            priority: <PriorityBadge priority={fmt(t.priority) || 'low'} />,
                                            createdAt: t.createdAt ? new Date(t.createdAt).toGMTString().slice(0, -7) : '',
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
    )
}

export default Dashboard