import { LuLayoutDashboard, LuTicket } from "react-icons/lu";
import Header from "../components/dashboard/Header";
import Cards from "../components/dashboard/Cards";
import Table from "../components/ui/Table";
import Chart from "../components/dashboard/Chart";
import Chart2 from "../components/dashboard/Chart2";
import Chart3 from "../components/dashboard/Chart3";
import useTickets from "../Hooks/Tickets/useTickets";

import PriorityBadge from "../components/ui/PriorityBadge";
import StatusBadge from "../components/ui/StatusBadge";
import Banner from "../components/dashboard/Banner";
import { useAuth } from "../Hooks/useAuth";
import { ROLES } from "../utils/AuthUtil";

const dashboardViewByRole = {
  [ROLES.ADMIN]: {
    title: "Recent Tickets",
    emptyTitle: "No tickets right now",
    emptyHint: "New customer requests will appear here.",
    statuses: null,
  },
  [ROLES.ASSIGNEE]: {
    title: "Recent Assigned Tickets",
    emptyTitle: "No assigned work right now",
    emptyHint: "Assigned and reopened tickets will appear here.",
    statuses: ["assigned", "in-progress", "reopened"],
  },
  [ROLES.CLIENT]: {
    title: "Recent Requests",
    emptyTitle: "No requests yet",
    emptyHint: "Create a ticket to start tracking support progress.",
    statuses: null,
  },
};

function Dashboard() {
  const { data: tickets = [] } = useTickets();
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;
  const dashboardView =
    dashboardViewByRole[user?.role] || dashboardViewByRole[ROLES.CLIENT];
  const filteredData = tickets
    .filter((t) =>
      dashboardView.statuses
        ? dashboardView.statuses.includes((t.status || "").toLowerCase())
        : true,
    )
    .toSorted(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    );

  const recentTickets = filteredData.slice(0, 3);

  return (
    <div>
      <div className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white p-4 backdrop-blur dark:border-gray-800 dark:bg-[#0f141b]/95">
        <Header
          icon={<LuLayoutDashboard size={16} className="inline" />}
          title="Dashboard"
          description={
            user?.role === ROLES.ADMIN
              ? "Operational overview across visible support work."
              : user?.role === ROLES.ASSIGNEE
                ? "Your assigned tickets, workload, and resolution progress."
                : "Track your submitted requests and support progress."
          }
        />
      </div>

      <div>
        {/* <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-1rem)] lg:min-h-[calc(100vh-6rem)] m-2 rounded-2xl'> */}
        <div className="mr-1 bg-white dark:bg-gray-900 p-1 md:p-4 w-[calc(100%-0.5rem)] lg:min-h-[calc(100vh-5.5rem)] m-1 rounded-lg border border-gray-200 shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:shadow-none">
          <div className="m-1 flex min-h-[calc(100vh-5.5rem)] w-full flex-col items-start space-y-2 p-3 md:p-4">
            {/* <Banner /> */}
            <Cards />
            <div className="flex flex-col sm:flex-col justify-around w-full mt-1 gap-5">
              <div className="hidden h-fit items-center justify-between rounded-lg border border-gray-200 bg-white py-3 shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none sm:flex">
                <div className="flex flex-1 justify-center items-center">
                  <Chart />
                </div>
                <div className="h-56 w-px shrink-0 self-center bg-gray-200 dark:bg-gray-800" />
                {!isAdmin && (
                  <div className="flex flex-1 justify-center">
                    <Chart2 />
                  </div>
                )}
                {isAdmin && (
                  <>
                    <div className="h-56 w-px shrink-0 self-center bg-gray-200 dark:bg-gray-800" />
                    <div className="flex flex-1 justify-center">
                      <Chart3 />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full relative">
                {filteredData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center w-full py-5 text-gray-500">
                    <LuTicket size={48} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">
                      {dashboardView.emptyTitle}
                    </p>
                    <p className="text-sm">{dashboardView.emptyHint}</p>
                  </div>
                ) : (
                  <Table
                    title={dashboardView.title}
                    columns={[
                      { key: "id", title: "ID", mobile: false },
                      { key: "ticket", title: "Ticket", mobilePrimary: true },
                      { key: "requester", title: "Requester", mobile: false },
                      { key: "priority", title: "Priority" },
                      { key: "status", title: "Status" },
                      { key: "createdAt", title: "Created", mobile: false },
                    ]}
                    data={recentTickets.map((t) => {
                      const fmt = (s) => {
                        if (!s) return "";
                        const replaced = String(s).replace(/-/g, " ");
                        return (
                          replaced.charAt(0).toLowerCase() + replaced.slice(1)
                        );
                      };
                      return {
                        id: t.id,
                        ticket: (
                          <p className="truncate font-medium text-gray-900 dark:text-white">
                            {t.title}
                          </p>
                        ),
                        requester: (
                          <div className="min-w-36">
                            <p className="truncate text-xs font-medium text-gray-700 dark:text-gray-200">
                              {t.customerName || t.company || "Customer"}
                            </p>
                            <p className="truncate text-[11px] text-gray-400">
                              {t.customerEmail || "No email"}
                            </p>
                          </div>
                        ),
                        priority: (
                          <PriorityBadge priority={fmt(t.priority) || "low"} />
                        ),
                        status: (
                          <StatusBadge status={fmt(t.status) || "open"} />
                        ),
                        createdAt: (
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {t.createdAt
                              ? new Date(t.createdAt).toDateString()
                              : "-"}
                          </span>
                        ),
                      };
                    })}
                    currentPage={1}
                    totalPages={1}
                    totalItems={recentTickets.length}
                    onPrev={() => {}}
                    onNext={() => {}}
                    itemLabel="Tickets"
                    height="sm"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
