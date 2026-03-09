import { useEffect, useState } from "react";
import { LuTicket, LuSlidersHorizontal, LuArrowDownUp, } from "react-icons/lu"

import Header from '../components/dashboard/Header';
import FilterButton from '../components/ui/FilterButton';
import Table from '../components/ui/Table';
import Actions from '../components/ticket/Actions';
import StatusBadge from '../components/ui/StatusBadge';
import PriorityBadge from '../components/ui/PriorityBadge';

import useTickets from '../Hooks/Tickets/useTickets';
import useFilter from '../Hooks/Tickets/useFilter';
import useSort from '../Hooks/Tickets/useSort';
import TicketSearch from '../components/ticket/TicketSearch';

import TableSkeleton from "../components/ui/TableSkeleton";
import DatePicker from "../components/ui/DatePicker";

// Filter options
const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
]

const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
]

const dateOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' }
]

// Sort options for the sort menu
const sortOptions = [
    { value: 'createdAt', label: 'Created At' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'title', label: 'Title' },
]

const sortGroups = [
    {
        title: 'Sort By',
        filterType: 'sortKey',
        options: sortOptions
    },
    {
        title: 'Direction',
        filterType: 'sortDirection',
        options: [
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' }
        ]
    }
]

// Filter groups for the combined filter menu
const filterGroups = [
    {
        title: 'Status',
        filterType: 'status',
        options: statusOptions
    },
    {
        title: 'Priority',
        filterType: 'priority',
        options: priorityOptions
    }
]


function Ticket() {

    const { data, error, isLoading } = useTickets()
    const [isOpen, setIsOpen] = useState(null)
    const [searchedTickets, setSearchedTickets] = useState(null)

    // Use the filter hook
    const { filteredTickets, filters, setFilter, clearFilters, hasActiveFilters } = useFilter(data || []);

    // Sorting state
    const [sortState, setSortState] = useState({ key: null, direction: 'asc' });
    const { sortedData, sort, setSort, clearSort } = useSort(
        (searchedTickets !== null
            ? filteredTickets.filter(ticket => searchedTickets.some(searched => searched.id === ticket.id))
            : filteredTickets),
        sortState
    );

    // Combine search, filter, and sort results
    const ticketsToDisplay = sortedData;

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalItems = ticketsToDisplay.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedTickets = ticketsToDisplay.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

    useEffect(() => {
        setCurrentPage(1)
    }, [searchedTickets, filters])


    return (
        <div>
            <div className='sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 w-full'>
                <Header
                    icon={<LuTicket size={20} className="inline" />}
                    title="Tickets"
                    description="Manage tickets and track performance."
                />
            </div>


            <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-1rem)] h-[calc(100vh-6rem)] m-2 rounded-2xl'>
                <div className='sticky top-18 z-5 bg-white dark:bg-gray-800 flex justify-between items-center gap-2 w-full border-b-2 border-gray-100 dark:border-gray-700 mb-5 py-2'>
                    <TicketSearch onResults={setSearchedTickets} />
                    {/* <DatePicker /> */}
                    <div className='flex items-center gap-2'>
                        {/* Sorting Button */}
                        <FilterButton
                            title="Sort"
                            icon={<LuArrowDownUp size={15} />}
                            isOpen={isOpen === 'sort'}
                            setIsOpen={(open) => setIsOpen(open ? 'sort' : null)}
                            filterGroups={sortGroups}
                            filters={{
                                sortKey: sort.key,
                                sortDirection: sort.direction
                            }}
                            setFilter={(type, value) => {
                                if (type === 'sortKey') {
                                    setSortState(prev => ({ ...prev, key: value }))
                                    setSort(value)
                                } else if (type === 'sortDirection') {
                                    setSortState(prev => ({ ...prev, direction: value }))
                                    setSort(prev => ({ ...prev, direction: value }))
                                }
                            }}
                            clearFilters={() => {
                                setSortState({ key: null, direction: 'asc' })
                                clearSort()
                            }}
                            hasActiveFilters={!!sort.key}
                        />

                        <FilterButton
                            title="Filter"
                            icon={<LuSlidersHorizontal size={15} className={`${isOpen === 'filter' ? 'rotate-180' : ''}`} />}
                            isOpen={isOpen === 'filter'}
                            setIsOpen={(open) => setIsOpen(open ? 'filter' : null)}
                            filterGroups={filterGroups}
                            filters={filters}
                            setFilter={setFilter}
                            clearFilters={clearFilters}
                            hasActiveFilters={hasActiveFilters}
                            otherActions={<DatePicker onRangeChange={(range) => setFilter('dateRange', range)} />}
                        />
                    </div>
                </div>

                {isLoading ?
                    <TableSkeleton rows={10} />
                    : ticketsToDisplay.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-10rem)] py-20 text-gray-500">
                            <LuTicket size={48} className="mb-4 opacity-50" />
                            <p className="text-lg font-medium">No tickets found</p>
                            <p className="text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    ) : <Table
                        columns={[
                            { key: 'id', title: 'ID' },
                            { key: 'title', title: 'Title' },
                            // {key: 'description', title: 'Description'},
                            { key: 'customer', title: 'Customer' },
                            { key: 'priority', title: 'Priority' },
                            { key: 'status', title: 'Status' },
                            { key: 'createdAt', title: 'Created At' },
                            { key: 'actions', title: 'Actions' },
                        ]}
                        data={
                            paginatedTickets.map((t) => {
                                const fmt = (s) => {
                                    if (!s) return '';
                                    const replaced = String(s).replace("-", ' ');
                                    return replaced.charAt(0).toLowerCase() + replaced.slice(1);
                                };
                                return {
                                    id: t.id,
                                    title: t.title,
                                    customer: t.customerEmail || '',
                                    // description: t.description || '',
                                    priority: <PriorityBadge priority={fmt(t.priority) || 'low'} />,
                                    status: <StatusBadge status={fmt(t.status) || 'open'} />,
                                    createdAt: t.createdAt ? new Date(t.createdAt).toUTCString().slice(0, -7) : '',
                                    actions: <Actions ticketId={t.id} />
                                };
                            })
                        }
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                }

            </div>
        </div>
    )
}
export default Ticket