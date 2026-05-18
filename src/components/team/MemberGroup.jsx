import { useMemo, useState } from "react";
import {
  LuBriefcaseBusiness,
  LuPanelRightClose,
  LuSearch,
  LuTrash2,
  LuUsersRound,
} from "react-icons/lu";
import useMembers from "../../Hooks/Team/useMembers";
import useTickets from "../../Hooks/Tickets/useTickets";
import TableSkeleton from "../ui/TableSkeleton";
import Table from "../ui/Table";
import DeleteMemberModal from "./DeleteMemberModal";
import StatusBadge from "../ui/StatusBadge";
import PriorityBadge from "../ui/PriorityBadge";
import { OptionButton } from "../ui/Button";

const ITEMS_PER_PAGE = 10;

const workloadMeta = (count = 0) => {
  if (count === 0)
    return {
      label: "Available",
      className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    };
  if (count <= 2)
    return { label: "Light", className: "bg-sky-50 text-sky-700 ring-sky-200" };
  if (count <= 5)
    return {
      label: "Busy",
      className: "bg-amber-50 text-amber-700 ring-amber-200",
    };
  return {
    label: "Overloaded",
    className: "bg-red-50 text-red-700 ring-red-200",
  };
};

const formatTeam = (team) => String(team || "No team").replace(/-/g, " ");

function TeamStat({ label, value, tone = "bg-blue-50 text-blue-600" }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none flex flex-row items-center gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-md ${tone}`}
      >
        <LuBriefcaseBusiness size={16} />
      </div>
      <div className="flex items-center gap-1 rounded-md py-1">
        <p className="text-lg font-medium text-gray-950 dark:text-white">
          {value}
        </p>
        <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
      </div>
    </div>
  );
}

function WorkloadBadge({ count }) {
  const meta = workloadMeta(count);
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

function MemberDrawer({ member, tickets = [], onClose }) {
  if (!member) return null;

  const assignedTickets = tickets.filter(
    (ticket) => ticket.assignedTo === member.id,
  );
  const name = `${member.firstName || ""} ${member.lastName || ""}`.trim();
  const workload = workloadMeta(assignedTickets.length);

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-30 bg-gray-950/40 backdrop-blur-[1px] xl:hidden"
        aria-label="Close member details backdrop"
        onClick={onClose}
      />
      <aside className="fixed left-1/2 top-1/2 z-40 flex h-[calc(100vh-1rem)] w-[min(92vw,24rem)] -translate-x-1/2 -translate-y-1/2 shrink-0 flex-col rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-2xl shadow-gray-950/20 dark:border-gray-800 dark:bg-gray-900 sm:bottom-2 sm:right-2 sm:left-auto sm:top-2 sm:h-auto sm:translate-x-0 sm:translate-y-0 xl:static xl:z-auto xl:h-[calc(100vh-5.5rem)] xl:w-88 xl:shadow-sm xl:shadow-gray-200/60 dark:xl:shadow-none">
        <div className="mb-3 flex items-start justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-800">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={member.avatar}
              alt={name}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-gray-900 dark:text-white">
                {name}
              </h2>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {member.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-200 bg-white p-2 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close member details"
          >
            <LuPanelRightClose size={15} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          <section className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950/50">
              <p className="text-[10px] font-semibold uppercase text-gray-400">
                Team
              </p>
              <p className="mt-1 text-xs font-semibold capitalize text-gray-800 dark:text-gray-100">
                {formatTeam(member.team)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950/50">
              <p className="text-[10px] font-semibold uppercase text-gray-400">
                Workload
              </p>
              <p
                className={`mt-1 text-xs font-semibold ${workload.className.split(" ").slice(1, 2).join(" ")}`}
              >
                {workload.label}
              </p>
            </div>
          </section>

          <section>
            <p className="mb-2 text-[10px] font-semibold uppercase text-gray-400">
              Assigned Tickets
            </p>
            {assignedTickets.length === 0 ? (
              <p className="rounded-lg border border-dashed border-gray-200 py-6 text-center text-xs text-gray-400 dark:border-gray-800">
                No assigned tickets.
              </p>
            ) : (
              <div className="space-y-2">
                {assignedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-gray-400">
                          {ticket.id}
                        </p>
                        <p className="truncate text-xs font-semibold text-gray-800 dark:text-gray-100">
                          {ticket.title}
                        </p>
                      </div>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <StatusBadge
                      status={String(ticket.status || "open").replace(
                        /-/g,
                        " ",
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </aside>
    </>
  );
}

export default function MemberGroup() {
  const { data = [], isLoading } = useMembers();
  const { data: tickets = [] } = useTickets();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [drawerMemberId, setDrawerMemberId] = useState(null);
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [workloadFilter, setWorkloadFilter] = useState("all");
  const [openFilter, setOpenFilter] = useState(null);

  const teamOptions = useMemo(
    () => [
      {
        label: "All teams",
        value: "all",
        onClick: () => {
          setTeamFilter("all");
          setCurrentPage(1);
        },
      },
      ...Array.from(
        new Set(data.map((member) => member.team).filter(Boolean)),
      ).map((team) => ({
        label: formatTeam(team),
        value: team,
        onClick: () => {
          setTeamFilter(team);
          setCurrentPage(1);
        },
      })),
    ],
    [data],
  );
  const workloadOptions = [
    { label: "All workloads", value: "all" },
    { label: "Available", value: "available" },
    { label: "Light", value: "light" },
    { label: "Busy", value: "busy" },
    { label: "Overloaded", value: "overloaded" },
  ].map((option) => ({
    ...option,
    onClick: () => {
      setWorkloadFilter(option.value);
      setCurrentPage(1);
    },
  }));

  const enrichedMembers = useMemo(
    () =>
      data.map((member) => {
        const assignedCount = tickets.filter(
          (ticket) => ticket.assignedTo === member.id,
        ).length;
        return {
          ...member,
          ticketsAssigned: assignedCount,
          workload: workloadMeta(assignedCount).label.toLowerCase(),
        };
      }),
    [data, tickets],
  );

  const filteredMembers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enrichedMembers.filter((member) => {
      const matchesSearch =
        !term ||
        [member.firstName, member.lastName, member.email, member.team].some(
          (value) =>
            String(value || "")
              .toLowerCase()
              .includes(term),
        );
      const matchesTeam = teamFilter === "all" || member.team === teamFilter;
      const matchesWorkload =
        workloadFilter === "all" || member.workload === workloadFilter;
      return matchesSearch && matchesTeam && matchesWorkload;
    });
  }, [enrichedMembers, search, teamFilter, workloadFilter]);

  const totalItems = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const selectedMember = enrichedMembers.find(
    (member) => member.id === drawerMemberId,
  );
  const mostLoaded = enrichedMembers.reduce(
    (top, member) =>
      member.ticketsAssigned > (top?.ticketsAssigned || 0) ? member : top,
    null,
  );
  const activeAssigned = enrichedMembers.reduce(
    (sum, member) => sum + member.ticketsAssigned,
    0,
  );
  const availableMembers = enrichedMembers.filter(
    (member) => member.ticketsAssigned === 0,
  ).length;

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const openDeleteModal = (id) => {
    setSelectedMemberId(id);
    setShowModal(true);
  };

  return (
    <div className="flex w-full gap-3">
      <div className="min-w-0 flex-1 space-y-4">
        <div className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
          <TeamStat label="Total Members" value={enrichedMembers.length} />
          <TeamStat
            label="Active Assignments"
            value={activeAssigned}
            tone="bg-amber-50 text-amber-600"
          />
          <TeamStat
            label="Available Members"
            value={availableMembers}
            tone="bg-emerald-50 text-emerald-600"
          />
          <TeamStat
            label="Most Loaded"
            value={
              mostLoaded
                ? `${mostLoaded.firstName} (${mostLoaded.ticketsAssigned})`
                : "-"
            }
            tone="bg-violet-50 text-violet-600"
          />
        </div>

        <div className="flex flex-col gap-2 py-2 dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-center">
          <div className="relative min-w-0 flex-1">
            <LuSearch
              size={15}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search name, email, or team"
              className="h-10 w-sm max-w-xs rounded-md border border-gray-200 bg-white pl-9 pr-3 text-xs font-medium text-gray-900 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-500/20"
              type="search"
            />
          </div>
          <OptionButton
            title="Team"
            options={teamOptions}
            selected={teamFilter}
            isOpen={openFilter === "team"}
            setIsOpen={(open) => setOpenFilter(open ? "team" : null)}
          />
          <OptionButton
            title="Workload"
            options={workloadOptions}
            selected={workloadFilter}
            isOpen={openFilter === "workload"}
            setIsOpen={(open) => setOpenFilter(open ? "workload" : null)}
          />
        </div>

        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : filteredMembers.length === 0 ? (
          <div className="flex h-72 w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 py-20 text-gray-500 dark:border-gray-800">
            <LuUsersRound size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No team members found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <Table
            itemLabel="Members"
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPrev={handlePrev}
            onNext={handleNext}
            onRowClick={setDrawerMemberId}
            columns={[
              // { key: "id", title: "ID" },
              { key: "name", title: "Name" },
              { key: "email", title: "Email" },
              { key: "team", title: "Team" },
              { key: "workload", title: "Workload" },
              { key: "actions", title: "" },
            ]}
            data={paginatedMembers.map((member) => ({
              id: member.id,
              name: (
                <div className="flex items-center gap-2">
                  <img
                    src={member.avatar}
                    alt={`${member.firstName}`}
                    className="h-7 w-7 rounded-md object-cover"
                  />
                  <span className="font-medium">
                    {member.firstName} {member.lastName}
                  </span>
                </div>
              ),
              email: member.email,
              team: (
                <span className="capitalize">{formatTeam(member.team)}</span>
              ),
              workload: (
                <div className="flex items-center gap-2">
                  <WorkloadBadge count={member.ticketsAssigned} />
                  <span className="text-xs text-gray-400">
                    {member.ticketsAssigned} tickets
                  </span>
                </div>
              ),
              actions: (
                <div
                  className="flex justify-end"
                  onClick={(event) => event.stopPropagation()}
                >
                  {member.ticketsAssigned === 0 ? (
                    <button
                      onClick={() => openDeleteModal(member.id)}
                      className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50"
                      title="Delete Member"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Cannot delete: {member.ticketsAssigned} active
                    </span>
                  )}
                  {showModal && selectedMemberId === member.id && (
                    <DeleteMemberModal
                      MemberId={selectedMemberId}
                      onClose={() => setShowModal(false)}
                    />
                  )}
                </div>
              ),
            }))}
          />
        )}
      </div>

      <MemberDrawer
        member={selectedMember}
        tickets={tickets}
        onClose={() => setDrawerMemberId(null)}
      />
    </div>
  );
}
