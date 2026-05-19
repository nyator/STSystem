import { useState } from "react";
import { LuLayoutDashboard, LuTicket } from "react-icons/lu";
import Header from "../components/dashboard/Header";
import Cards from "../components/dashboard/Cards";
import Table from "../components/ui/Table";
import Chart from "../components/dashboard/Chart";
import Chart2 from "../components/dashboard/Chart2";
import useTickets from "../Hooks/Tickets/useTickets";

import PriorityBadge from "../components/ui/PriorityBadge";
import StatusBadge from "../components/ui/StatusBadge";
import Banner from "../components/dashboard/Banner";
import { useAuth } from "../Hooks/useAuth";
import { ROLES } from "../utils/AuthUtil";

const dashboardViewByRole = {
  [ROLES.ADMIN]: {
    title: "Ticket Queue",
    emptyTitle: "No tickets right now",
    emptyHint: "New customer requests will appear here.",
    statuses: ["open"],
  },
  [ROLES.ASSIGNEE]: {
    title: "My Work Queue",
    emptyTitle: "No assigned work right now",
    emptyHint: "Assigned and reopened tickets will appear here.",
    statuses: ["assigned", "in-progress", "reopened"],
  },
  [ROLES.CLIENT]: {
    title: "My Recent Requests",
    emptyTitle: "No requests yet",
    emptyHint: "Create a ticket to start tracking support progress.",
    statuses: ["open", "assigned", "in-progress", "resolved", "reopened"],
  },
};

function Dashboard() {
  const { data: tickets = [] } = useTickets();
  const { user } = useAuth();
  const dashboardView =
    dashboardViewByRole[user?.role] || dashboardViewByRole[ROLES.CLIENT];
  const filteredData = tickets.filter((t) =>
    dashboardView.statuses.includes((t.status || "").toLowerCase()),
  );

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div>
      <div className="sticky top-0 z-10 w-full border-b border-gray-200 bg-[#f6f7f9]/95 p-4 backdrop-blur dark:border-gray-800 dark:bg-[#0f141b]/95">
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
        <div className="mr-1">
          <div className="m-1 flex min-h-[calc(100vh-5.5rem)] w-full flex-col items-start space-y-2 p-3 md:p-4">
            <Banner />
            <Cards />
            <div className="flex flex-col sm:flex-col justify-around w-full mt-1 gap-5 ">
              <div className="hidden h-fit items-center justify-start rounded-lg border border-gray-200 bg-white py-3 shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none md:flex">
                <div className="w-3/6 flex justify-center items-center  pb-10">
                  <Chart />
                </div>
                <div className="w-3/6 flex justify-center ">
                  <Chart2 />
                </div>
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
                      { key: "id", title: "ID" },
                      { key: "title", title: "Title" },
                      // { key: 'description', title: 'Description' },
                      // { key: 'customer', title: 'Customer' },
                      
                      { key: "priority", title: "Priority" },
                      { key: "status", title: "Status" },
                      { key: "createdAt", title: "Created At" },
                    ]}
                    data={paginatedData.map((t) => {
                      const fmt = (s) => {
                        if (!s) return "";
                        const replaced = String(s).replace(/-/g, " ");
                        return (
                          replaced.charAt(0).toLowerCase() + replaced.slice(1)
                        );
                      };
                      return {
                        id: t.id,
                        title: t.title,
                        customer: t.customerEmail || "",
                        // description: t.description || '',
                        priority: (
                          <PriorityBadge priority={fmt(t.priority) || "low"} />
                        ),
                        status: (
                          <StatusBadge status={fmt(t.status) || "open"} />
                        ),
                        createdAt: t.createdAt
                          ? new Date(t.createdAt).toGMTString().slice(0, -13)
                          : "",
                      };
                    })}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPrev={handlePrev}
                    onNext={handleNext}
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
