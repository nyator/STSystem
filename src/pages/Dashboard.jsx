import React, { useState } from 'react';
import { LuLayoutDashboard, LuPlus } from 'react-icons/lu';
import Header from '../components/dashboard/Header';
import Cards from '../components/dashboard/Cards';
import Table from '../components/ui/Table';
import Chart from '../components/dashboard/Chart';
import useTickets from '../Hooks/useTickets';

import PriorityBadge from '../components/ui/PriorityBadge';
import Actions from '../components/ticket/Actions';



function Dashboard() {

    const { data: tickets = [] } = useTickets();
    const filteredData = tickets.filter(t => (t.status || '').toLowerCase() === 'open');

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
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
            <div className='sticky top-0 z-10 bg-white p-4 w-full'>
                <Header
                    icon={<LuLayoutDashboard size={20} className="inline" />}
                    title="Dashboard"
                    description="Overview of tickets and system performance."
                />
            </div>

            <div>
                <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] lg:h-[calc(100vh-6rem)] m-2 rounded-2xl'>
                    <Cards />

                    <div className='flex flex-col lg:flex-row justify-around w-full mt-1 gap-5'>
                        <div className='lg:w-3/5'>
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
                                            priority: <PriorityBadge priority={fmt(t.priority) || 'low'} />, createdAt: t.createdAt ? new Date(t.createdAt).toGMTString().slice(0, -7) : '',
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
                        <div className='lg:w-2/5 lg:mt-8 bg-gray-50 h-fit p-3 rounded-2xl'>
                            <Chart />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard