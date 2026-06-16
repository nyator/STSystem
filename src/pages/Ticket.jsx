import { useEffect, useState } from "react";
import {
  LuTicket,
  LuSlidersHorizontal,
  LuArrowDownUp,
  LuKanban,
  LuTable2,
  LuPlus,
  LuMail,
  LuBuilding2,
  LuUserRound,
  LuCalendarClock,
} from "react-icons/lu";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Header from "../components/dashboard/Header";
import FilterButton from "../components/ui/FilterButton";
import Table from "../components/ui/Table";
import StatusBadge from "../components/ui/StatusBadge";
import PriorityBadge from "../components/ui/PriorityBadge";
import { OptionButton } from "../components/ui/Button";

import useTickets from "../Hooks/Tickets/useTickets";
import useFilter from "../Hooks/Tickets/useFilter";
import useSort from "../Hooks/Tickets/useSort";
import useCreateTicket from "../Hooks/Tickets/useCreateTicket";
import TicketSearch from "../components/ticket/TicketSearch";

import TableSkeleton from "../components/ui/TableSkeleton";
import DatePicker from "../components/ui/DatePicker";
import TicketDrawer from "../components/ticket/TicketDrawer";
import useMembers from "../Hooks/Team/useMembers";
import Button from "../components/ui/Button";
import TicketKanban from "../components/ticket/TicketKanban";
import {
  TICKET_CATEGORIES,
  formatLabel,
  getTicketSlaState,
} from "../utils/TicketUtil";
import TicketModal from "../components/ticket/TicketModal";
import { FormInput, FormTextArea } from "../components/ui/Input";
import { canCreateTicket } from "../utils/AuthUtil";
import { useAuth } from "../Hooks/useAuth";

// Filter options
const statusOptions = [
  { value: "open", label: "Open" },
  { value: "assigned", label: "Assigned" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "reopened", label: "Reopened" },
];

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const categoryOptions = TICKET_CATEGORIES.map((category) => ({
  value: category,
  label: formatLabel(category),
}));

const assignmentOptions = [
  { value: "assigned", label: "Assigned" },
  { value: "unassigned", label: "Unassigned" },
];

// Sort options for the sort menu
const sortOptions = [
  { value: "createdAt", label: "Created At" },
  { value: "priority", label: "Priority" },
  { value: "status", label: "Status" },
  { value: "title", label: "Title" },
];

const sortGroups = [
  {
    title: "Sort By",
    filterType: "sortKey",
    options: sortOptions,
  },
  {
    title: "Direction",
    filterType: "sortDirection",
    options: [
      { value: "asc", label: "Ascending" },
      { value: "desc", label: "Descending" },
    ],
  },
];

// Filter groups for the combined filter menu
const filterGroups = [
  {
    title: "Status",
    filterType: "status",
    options: statusOptions,
  },
  {
    title: "Priority",
    filterType: "priority",
    options: priorityOptions,
  },
  {
    title: "Category",
    filterType: "category",
    options: categoryOptions,
  },
  {
    title: "Assignment",
    filterType: "assignment",
    options: assignmentOptions,
  },
];

function Ticket() {
  const { data, isLoading } = useTickets();
  const { data: members } = useMembers();
  const [isOpen, setIsOpen] = useState(null);
  const [openNewTicket, setOpenNewTicket] = useState(false);
  const [ticketOptionOpen, setTicketOptionOpen] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("low");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchedTickets, setSearchedTickets] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const { user } = useAuth();
  const { createTicket } = useCreateTicket();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Use the filter hook
  const {
    filteredTickets,
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  } = useFilter(data || []);

  // Sorting state
  const [sortState, setSortState] = useState({ key: null, direction: "asc" });
  const { sortedData, sort, setSort, clearSort } = useSort(
    searchedTickets !== null
      ? filteredTickets.filter((ticket) =>
          searchedTickets.some((searched) => searched.id === ticket.id),
        )
      : filteredTickets,
    sortState,
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
    currentPage * itemsPerPage,
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  useEffect(() => {
    const timer = setTimeout(() => setCurrentPage(1), 0);
    return () => clearTimeout(timer);
  }, [searchedTickets, filters]);

  const priorityMenuOptions = priorityOptions.map((option) => ({
    ...option,
    onClick: () => setSelectedPriority(option.value),
  }));
  const categoryMenuOptions = categoryOptions.map((option) => ({
    ...option,
    onClick: () => setSelectedCategory(option.value),
  }));

  const closeNewTicketModal = () => {
    setOpenNewTicket(false);
    reset();
    setSelectedPriority("low");
    setSelectedCategory("general");
    setTicketOptionOpen(null);
  };

  const onCreateTicket = (formData) => {
    createTicket(
      {
        ...formData,
        priority: selectedPriority,
        category: selectedCategory,
        createdBy: user.id,
        actor: user,
      },
      {
        onSuccess: () => {
          toast.success("Ticket created!");
          closeNewTicketModal();
        },
        onError: () => toast.error("Error creating ticket!"),
      },
    );
  };

  // const exportTickets = () => {
  //     const headers = ["ID", "Title", "Customer", "Company", "Category", "Priority", "Status", "Assigned To", "Created At", "Due At"]
  //     const rows = ticketsToDisplay.map((ticket) => {
  //         const member = members?.find((m) => m.id === ticket.assignedTo)
  //         return [
  //             ticket.id,
  //             ticket.title,
  //             ticket.customerName || ticket.customerEmail || "",
  //             ticket.company || "",
  //             ticket.category || "general",
  //             ticket.priority,
  //             ticket.status,
  //             member ? `${member.firstName} ${member.lastName}` : "Unassigned",
  //             ticket.createdAt || "",
  //             ticket.dueAt || "",
  //         ]
  //     })
  //     const csv = [headers, ...rows]
  //         .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  //         .join("\n")
  //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  //     const url = URL.createObjectURL(blob)
  //     const link = document.createElement("a")
  //     link.href = url
  //     link.download = "tickets.csv"
  //     link.click()
  //     URL.revokeObjectURL(url)
  // }

  return (
    <div>
      <div className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white p-4 backdrop-blur dark:border-gray-800 dark:bg-[#0f141b]/95">
        <Header
          icon={<LuTicket size={16} className="inline" />}
          title="Tickets"
          description="Manage tickets and track performance."
        />
      </div>

      <div className="flex min-h-[calc(100vh-5.5rem)] m-1 gap-1">
        <div className="flex h-[calc(100vh-5.5rem)] w-full flex-col items-start rounded-lg border border-gray-200 bg-white px-3 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none sm:px-4">
          <div className="sticky top-5 z-40 mb-2 flex w-full flex-col gap-3 border-b border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full flex-col gap-2 sm:flex-row md:max-w-xl">
              {canCreateTicket(user) && (
                <div className="hidden md:block">
                  <Button
                    variant="primary"
                    onClick={() => setOpenNewTicket(true)}
                  >
                    <LuPlus size={15} />
                    <span>Add Ticket</span>
                  </Button>
                </div>
              )}
              <TicketSearch onResults={setSearchedTickets} />
            </div>
            {/* <DatePicker /> */}
            <div className="flex w-full items-center md:justify-end gap-2">
              {/* <Button variant="default" onClick={exportTickets}>
                                <LuDownload size={15} />
                                <span className="hidden lg:inline">Export</span>
                            </Button> */}
              <Button
                variant="default"
                onClick={() =>
                  setViewMode((mode) => (mode === "table" ? "kanban" : "table"))
                }
              >
                {viewMode === "table" ? (
                  <LuKanban size={15} />
                ) : (
                  <LuTable2 size={15} />
                )}
                <span className="inline">
                  {viewMode === "table" ? "Kanban" : "Table"}
                </span>
              </Button>
              {/* Sorting Button */}
              <FilterButton
                title="Sort"
                icon={<LuArrowDownUp size={15} />}
                isOpen={isOpen === "sort"}
                setIsOpen={(open) => setIsOpen(open ? "sort" : null)}
                filterGroups={sortGroups}
                filters={{
                  sortKey: sort.key,
                  sortDirection: sort.direction,
                }}
                setFilter={(type, value) => {
                  if (type === "sortKey") {
                    setSortState((prev) => ({ ...prev, key: value }));
                    setSort(value);
                  } else if (type === "sortDirection") {
                    setSortState((prev) => ({ ...prev, direction: value }));
                    setSort((prev) => ({ ...prev, direction: value }));
                  }
                }}
                clearFilters={() => {
                  clearSort();
                  setSortState({ key: null, direction: "asc" });
                }}
                hasActiveFilters={!!sort.key}
              />

              <FilterButton
                title="Filter"
                icon={
                  <LuSlidersHorizontal
                    size={15}
                    className={`${isOpen === "filter" ? "rotate-180" : ""}`}
                  />
                }
                isOpen={isOpen === "filter"}
                setIsOpen={(open) => setIsOpen(open ? "filter" : null)}
                filterGroups={filterGroups}
                filters={filters}
                setFilter={setFilter}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                otherActions={
                  <DatePicker
                    onRangeChange={(range) => setFilter("dateRange", range)}
                  />
                }
              />
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton rows={10} />
          ) : ticketsToDisplay.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-10rem)] py-20 text-gray-500">
              <LuTicket size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">No tickets found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === "kanban" ? (
            <TicketKanban
              tickets={ticketsToDisplay}
              members={members || []}
              onSelectTicket={setSelectedTicketId}
            />
          ) : (
            <Table
              columns={[
                { key: "id", title: "ID", mobile: false },
                { key: "title", title: "Title", mobilePrimary: true },
                { key: "priority", title: "Priority" },
                { key: "status", title: "Status" },
                { key: "slaState", title: "SLA", mobile: false },
                { key: "assignedTo", title: "Assigned To", mobileAside: true },
              ]}
              data={paginatedTickets.map((t) => {
                const fmt = (s) => {
                  if (!s) return "";
                  return String(s).replace(/-/g, " ");
                };

                const assignedMember = members?.find(
                  (m) => m.id === t.assignedTo,
                );

                return {
                  id: t.id,
                  title: (
                    <p className="truncate font-meduim text-gray-900 dark:text-white">
                      {t.title}
                    </p>
                  ),
                  // customer: t.customerName || t.company || t.customerEmail || '',                                        description: t.description || '',
                  category: (
                    <span className="text-xs capitalize text-gray-500 dark:text-gray-300">
                      {formatLabel(t.category || "general")}
                    </span>
                  ),
                  priority: (
                    <PriorityBadge priority={fmt(t.priority) || "low"} />
                  ),
                  status: <StatusBadge status={fmt(t.status) || "open"} />,
                  slaState: (() => {
                    const slaState = getTicketSlaState(t);
                    const slaClasses = {
                      overdue: "bg-red-50 text-red-600 ring-red-100",
                      "due-soon":
                        "bg-yellow-50 text-yellow-700 ring-yellow-100",
                      "on-track": "bg-green-50 text-green-600 ring-green-100",
                      none: "bg-gray-50 text-gray-400 ring-gray-100",
                    };

                    return (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${slaClasses[slaState] || slaClasses.none}`}
                      >
                        {slaState === "none" ? "N/A" : formatLabel(slaState)}
                      </span>
                    );
                  })(),
                  createdAt: t.createdAt
                    ? new Date(t.createdAt).toUTCString().slice(0, -13)
                    : "",

                  assignedTo: assignedMember ? (
                    <div className="flex items-center gap-1.5">
                      <img
                        src={assignedMember.avatar}
                        className="w-5 h-5 rounded-full"
                        alt=""
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {assignedMember.firstName} {assignedMember.lastName}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Unassigned</span>
                  ),
                };
              })}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPrev={handlePrev}
              onNext={handleNext}
              onRowClick={setSelectedTicketId}
            />
          )}
        </div>
        <TicketDrawer
          ticketId={selectedTicketId}
          onClose={() => setSelectedTicketId(null)}
        />
      </div>

      {canCreateTicket(user) && (
        <button
          type="button"
          onClick={() => setOpenNewTicket(true)}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95 dark:bg-blue-500 md:hidden"
          aria-label="Add ticket"
        >
          <LuPlus size={20} />
        </button>
      )}

      <TicketModal
        size="sm"
        isOpen={openNewTicket}
        onClose={closeNewTicketModal}
        title="New Ticket"
        LAction="Cancel"
        RAction="Create Ticket"
        RIcon={
          <LuPlus
            size={16}
            className="inline mr-2 group-hover:animate-wiggle"
          />
        }
        submit={handleSubmit(onCreateTicket)}
        error={errors.title || errors.email || errors.description}
      >
        <DevTool control={control} />
        <form className="space-y-2">
          <FormInput
            name="title"
            placeholder="Enter Ticket Title"
            register={register}
            formfields={{ required: "Title is required" }}
            error={errors.title}
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <FormInput
              name="customerName"
              placeholder="Customer name"
              icon={
                <LuUserRound
                  className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                  size={15}
                />
              }
              register={register}
              formfields={{}}
            />
            <FormInput
              name="company"
              placeholder="Company"
              icon={
                <LuBuilding2
                  className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                  size={15}
                />
              }
              register={register}
              formfields={{}}
            />
          </div>
          <FormInput
            name="email"
            placeholder="Enter customer email"
            icon={
              <LuMail
                className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            error={errors.email}
          />
          <FormTextArea
            name="description"
            placeholder="Enter Ticket Description"
            register={register}
            formfields={{ required: "Description is required" }}
            error={errors.description}
          />
          <div className="flex flex-wrap gap-2">
            <OptionButton
              title="Priority"
              options={priorityMenuOptions}
              selected={selectedPriority}
              isOpen={ticketOptionOpen === "priority"}
              setIsOpen={(open) =>
                setTicketOptionOpen(open ? "priority" : null)
              }
            />
            <OptionButton
              title="Category"
              options={categoryMenuOptions}
              selected={selectedCategory}
              isOpen={ticketOptionOpen === "category"}
              setIsOpen={(open) =>
                setTicketOptionOpen(open ? "category" : null)
              }
            />
          </div>
          <FormInput
            name="dueAt"
            type="datetime-local"
            placeholder="Due date"
            icon={
              <LuCalendarClock
                className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{}}
          />
        </form>
      </TicketModal>
    </div>
  );
}
export default Ticket;
