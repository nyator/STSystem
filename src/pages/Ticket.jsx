import { useEffect, useState } from "react";
import { LuTicket, LuSlidersHorizontal, LuArrowDownUp, LuDownload, LuKanban, LuTable2 } from "react-icons/lu"

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
import TicketDrawer from "../components/ticket/TicketDrawer";
import useMembers from "../Hooks/Team/useMembers";
import Button from "../components/ui/Button";
import TicketKanban from "../components/ticket/TicketKanban";
import { TICKET_CATEGORIES, formatLabel } from "../utils/TicketUtil";

// Filter options
const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
    { value: 'reopened', label: 'Reopened' }
]

const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
]

const categoryOptions = TICKET_CATEGORIES.map((category) => ({
    value: category,
    label: formatLabel(category),
}))

const assignmentOptions = [
    { value: 'assigned', label: 'Assigned' },
    { value: 'unassigned', label: 'Unassigned' },
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
    },
    {
        title: 'Category',
        filterType: 'category',
        options: categoryOptions
    },
    {
        title: 'Assignment',
        filterType: 'assignment',
        options: assignmentOptions
    }
]


function Ticket() {

    const { data, isLoading } = useTickets()
    const { data: members } = useMembers()
    const [isOpen, setIsOpen] = useState(null)
    const [searchedTickets, setSearchedTickets] = useState(null)
    const [viewMode, setViewMode] = useState("table")
    const [selectedTicketId, setSelectedTicketId] = useState(null)

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
    const itemsPerPage = 9;
    const totalItems = ticketsToDisplay.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedTickets = ticketsToDisplay.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

    useEffect(() => {
        const timer = setTimeout(() => setCurrentPage(1), 0)
        return () => clearTimeout(timer)
    }, [searchedTickets, filters])


    const exportTickets = () => {
        const headers = ["ID", "Title", "Customer", "Company", "Category", "Priority", "Status", "Assigned To", "Created At", "Due At"]
        const rows = ticketsToDisplay.map((ticket) => {
            const member = members?.find((m) => m.id === ticket.assignedTo)
            return [
                ticket.id,
                ticket.title,
                ticket.customerName || ticket.customerEmail || "",
                ticket.company || "",
                ticket.category || "general",
                ticket.priority,
                ticket.status,
                member ? `${member.firstName} ${member.lastName}` : "Unassigned",
                ticket.createdAt || "",
                ticket.dueAt || "",
            ]
        })
        const csv = [headers, ...rows]
            .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\n")
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "tickets.csv"
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div>
            <div className='sticky top-0 z-10 w-full border-b border-gray-200 bg-[#f6f7f9]/95 p-4 backdrop-blur dark:border-gray-800 dark:bg-[#0f141b]/95'>
                <Header
                    icon={<LuTicket size={20} className="inline" />}
                    title="Tickets"
                    description="Manage tickets and track performance."
                />
            </div>

            <div className="flex min-h-[calc(100vh-5.5rem)] m-1 gap-1">

                <div className='flex h-[calc(100vh-5.5rem)] w-full flex-col items-start rounded-lg border border-gray-200 bg-white px-4 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none'>
                    <div className='sticky top-5 z-5 mb-4 flex w-full items-center justify-between gap-2 border-b border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-gray-900'>
                        <TicketSearch onResults={setSearchedTickets} />
                        {/* <DatePicker /> */}
                        <div className='flex items-center gap-2'>
                            <Button variant="default" onClick={exportTickets}>
                                <LuDownload size={15} />
                                <span className="hidden lg:inline">Export</span>
                            </Button>
                            <Button variant="default" onClick={() => setViewMode((mode) => mode === "table" ? "kanban" : "table")}>
                                {viewMode === "table" ? <LuKanban size={15} /> : <LuTable2 size={15} />}
                                <span className="hidden lg:inline">{viewMode === "table" ? "Kanban" : "Table"}</span>
                            </Button>
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
                                    clearSort()
                                    setSortState({ key: null, direction: 'asc' })
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
                                <p className="text-sm">Try adjusting your search or filters</p>
                            </div>
                        ) : viewMode === "kanban" ? (
                            <TicketKanban tickets={ticketsToDisplay} members={members || []} onSelectTicket={setSelectedTicketId} />
                        ) : <Table
                            columns={[
                                { key: 'id', title: 'ID' },
                                { key: 'title', title: 'Title' },
                                // { key: 'customer', title: 'Customer' },
                                // { key: 'category', title: 'Category' },
                                { key: 'priority', title: 'Priority' },
                                { key: 'status', title: 'Status' },
                                { key: 'assignedTo', title: 'Assigned To' },
                                // { key: 'sla', title: 'SLA' },
                                { key: 'actions', title: 'Actions' },
                            ]}
                            data={
                                paginatedTickets.map((t) => {
                                    const fmt = (s) => {
                                        if (!s) return '';
                                        return String(s).replace(/-/g, ' ')
                                    }

                                    const assignedMember = members?.find(m => m.id === t.assignedTo)

                                    return {
                                        id: t.id,
                                        // title: t.title,
                                        title: <span className="font-medium text-gray-800 dark:text-gray-100 truncate">{t.title}</span>,
                                        // customer: t.customerName || t.company || t.customerEmail || '',
                                        description: t.description || '',
                                        category: <span className="text-xs capitalize text-gray-500 dark:text-gray-300">{formatLabel(t.category || "general")}</span>,
                                        priority: <PriorityBadge priority={fmt(t.priority) || 'low'} />,
                                        status: <StatusBadge status={fmt(t.status) || 'open'} />,
                                        createdAt: t.createdAt ? new Date(t.createdAt).toUTCString().slice(0, -13) : '',
                                        actions: <Actions ticketId={t.id} rowIndex={paginatedTickets.findIndex(ticket => ticket.id === t.id)} dataLength={paginatedTickets.length} />,
                                        assignedTo: assignedMember ? (
                                            <div className="flex items-center gap-1.5">
                                                <img src={assignedMember.avatar} className="w-5 h-5 rounded-full" alt="" />
                                                <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                                                    {assignedMember.firstName} {assignedMember.lastName}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">Unassigned</span>
                                        ),

                                    };
                                })
                            }
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onRowClick={setSelectedTicketId}
                        />
                    }
                </div>
                <TicketDrawer ticketId={selectedTicketId} onClose={() => setSelectedTicketId(null)} />
            </div>
        </div>

    )
}
export default Ticket
