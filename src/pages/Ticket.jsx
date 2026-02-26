import { useState } from "react";
import { LuTicket, LuCalendarArrowDown, LuCircleCheck, LuShieldCheck, LuSlidersHorizontal, LuX } from "react-icons/lu"

import Header from '../components/dashboard/Header';
import FilterButton from '../components/ui/FilterButton';
import Table from '../components/ui/Table';
import Actions from '../components/ticket/Actions';
import StatusBadge from '../components/ui/StatusBadge';
import PriorityBadge from '../components/ui/PriorityBadge';

import useTickets from '../Hooks/useTickets';
import useFilter from '../Hooks/useFilter';
import TicketSearch from '../components/ticket/TicketSearch';

import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import TableSkeleton from "../components/ui/TableSkeleton";

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
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
]

function Ticket() {
    const { data, error, isLoading } = useTickets()
    const [isOpen, setIsOpen] = useState(null)
    const [searchedTickets, setSearchedTickets] = useState(null)
    
    // Use the filter hook
    const { filteredTickets, filters, setFilter, clearFilters, hasActiveFilters } = useFilter(data || [])

    // Combine search and filter results
    const ticketsToDisplay = searchedTickets !== null 
        ? filteredTickets.filter(ticket => 
            searchedTickets.some(searched => searched.id === ticket.id)
          )
        : filteredTickets


    return (
        <div>
            <div className='sticky top-0 z-10 bg-white p-4 w-full'>
                <Header
                    icon={<LuTicket size={20} className="inline" />}
                    title="Tickets"
                    description="Manage tickets and track performance."
                />
            </div>


            <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] min-h-screen m-2 rounded-2xl'>
                <div className=' bg-white flex justify-between items-center gap-2 w-full border-b-2 border-gray-100 mb-5 py-4'>
                    <TicketSearch onResults={setSearchedTickets} />

                    <div className='hidden md:flex items-center gap-2'>
                        <FilterButton
                            isOpen={isOpen === 'Status'}
                            setIsOpen={(open) => setIsOpen(open ? 'Status' : null)}
                            title="Status"
                            icon={<LuCircleCheck size={15} />}
                            options={statusOptions}
                            onFilterChange={setFilter}
                            currentFilter={filters.status}
                            filterType="status"
                        />
                        <FilterButton
                            isOpen={isOpen === 'Priority'}
                            setIsOpen={(open) => setIsOpen(open ? 'Priority' : null)}
                            title="Priority"
                            icon={<LuShieldCheck size={15} />}
                            options={priorityOptions}
                            onFilterChange={setFilter}
                            currentFilter={filters.priority}
                            filterType="priority"
                        />
                        <FilterButton
                            isOpen={isOpen === 'Date'}
                            setIsOpen={(open) => setIsOpen(open ? 'Date' : null)}
                            title="Date"
                            icon={<LuCalendarArrowDown size={15} />}
                            options={dateOptions}
                            onFilterChange={setFilter}
                            currentFilter={filters.date}
                            filterType="date"
                        />
                    </div>

                    <div className='flex md:hidden items-center gap-2 text-xs text-gray-600 bg-gray-50 border-2 border-gray-100 h-10 px-3 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300 focus:outline-none'>
                        <LuSlidersHorizontal />
                    </div>
                </div>

                {isLoading ?
                    <TableSkeleton rows={10} />
                    : ticketsToDisplay.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full py-20 text-gray-500">
                            <LuTicket size={48} className="mb-4 opacity-50" />
                            <p className="text-lg font-medium">No tickets found</p>
                            <p className="text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    ) : <Table
                        columns={[
                            { key: 'id', title: 'ID' },
                            { key: 'title', title: 'Title' },
                            { key: 'customer', title: 'Customer' },
                            { key: 'priority', title: 'Priority' },
                            { key: 'status', title: 'Status' },
                            { key: 'createdAt', title: 'Created At' },
                            { key: 'actions', title: 'Actions' },

                        ]}

                        data={
                            (ticketsToDisplay).map((t) => {
                                const fmt = (s) => {
                                    if (!s) return ''

                                    const replaced = String(s).replace("-", ' ')
                                    return replaced.charAt(0).toLowerCase() + replaced.slice(1)
                                }

                                return {
                                    id: t.id,
                                    title: t.title,
                                    customer: t.customerEmail || '',
                                    description: t.description || '',
                                    priority: <PriorityBadge priority={fmt(t.priority) || 'low'} />,
                                    status: <StatusBadge status={fmt(t.status) || 'open'} />,
                                    createdAt: t.createdAt ? new Date(t.createdAt).toUTCString().slice(0, -7) : '',
                                    actions: <Actions ticketId={t.id} />
                                }
                            })
                        }
                    />
                }
                <Pagination />
            </div>
        </div>
    )
}

export default Ticket