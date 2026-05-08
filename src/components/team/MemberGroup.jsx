import { useEffect, useMemo, useState } from "react";
import useMembers from "../../Hooks/Team/useMembers";
import MemberCard from "./MemberCard";
import TableSkeleton from "../ui/TableSkeleton";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";

const ITEMS_PER_PAGE = 10;

const USER_TYPE_COLORS = {
  admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  client: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  assignee: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export default function MemberGroup() {
  const { data, isLoading } = useMembers();
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedMembers = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, data]);

  const isEmpty = !isLoading && totalItems === 0;

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="w-full">
      {isEmpty && (
        <div className="text-center text-gray-500 mt-5">
          No members found. Please add a member to get started.
        </div>
      )}

      {/* Card layout — visible on small screens only */}
      <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 gap-6 md:hidden">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-100 animate-pulse rounded-xl"
              />
            ))
          : paginatedMembers.map((member) => (
              <MemberCard key={member.id} user={member} />
            ))}
      </div>
      {!isLoading && totalItems > 0 && (
        <div className="md:hidden mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPrev={handlePrev}
            onNext={handleNext}
            itemLabel="Members"
          />
        </div>
      )}

      {/* Table layout — visible on md screens and up */}
      <div className="hidden md:block mt-3">
        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : (
          <Table
            itemLabel="Members"
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPrev={handlePrev}
            onNext={handleNext}
            columns={[
              { key: "id", title: "ID" },
              { key: "name", title: "Name" },
              { key: "email", title: "Email" },
              { key: "team", title: "Team" },
              // { key: "userType", title: "Role" },
            ]}
            data={paginatedMembers.map((member) => ({
              id: member.id,
              name: (
                <div className="flex items-center gap-1">
                  <img
                    src={member.avatar}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-5 h-5 rounded-full"
                  />
                  {member.firstName} {member.lastName}
                </div>
              ),
              email: member.email,
              team: <p className="capitalize">{member.team}</p>,
              // userType: (
              //   <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${USER_TYPE_COLORS[member.userType] || USER_TYPE_COLORS.assignee}`}>
              //     {member.userType}
              //   </span>
              // ),
            }))}
          />
        )}
      </div>
    </div>
  );
}
