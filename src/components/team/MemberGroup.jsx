import { useEffect, useMemo, useState } from "react";
import { LuTrash2, LuUsersRound } from "react-icons/lu";
import useMembers from "../../Hooks/Team/useMembers";
import MemberCard from "./MemberCard";
import TableSkeleton from "../ui/TableSkeleton";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
// import DeleteModal from "../ui/DeleteModal"; // Assuming you have a modal component
import DeleteMemberModal from "./DeleteMemberModal"; // Assuming you have a modal component for deleting members

const ITEMS_PER_PAGE = 10;

export default function MemberGroup() {
  const { data, isLoading } = useMembers();
  const [currentPage, setCurrentPage] = useState(1);

  // State for handling deletion
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const totalItems = data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const timer = setTimeout(() => setCurrentPage(totalPages), 0);
      return () => clearTimeout(timer);
    }
  }, [currentPage, totalPages]);

  const paginatedMembers = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, data]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const openDeleteModal = (id) => {
    setSelectedMemberId(id);
    setShowModal(true);
  };

  return (
    <div className="w-full">
      {/* Card layout — Mobile */}
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

      {/* Table layout — Desktop */}
      <div className="hidden md:block mt-3">
        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-10rem)] py-20 text-gray-500">
            <LuUsersRound size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No team members found</p>
            <p className="text-sm">Add a new member to the team</p>
          </div>
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
              { key: "actions", title: "Actions" },
            ]}
            data={paginatedMembers.map((member) => ({
              id: member.id,
              name: (
                <div className="flex items-center gap-2">
                  <img
                    src={member.avatar}
                    alt={`${member.firstName}`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>
                    {member.firstName} {member.lastName}
                  </span>
                </div>
              ),
              email: member.email,
              team: <span className="capitalize">{member.team}</span>,
              actions: (
                <div className="flex justify-end">
                  {member.ticketsAssigned === 0 ? (
                    <button
                      onClick={() => openDeleteModal(member.id)}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                      title="Delete Member"
                    >
                      <LuTrash2
                        size={18}
                        className="text-red-500 group-active:scale-90 transition-transform"
                      />
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Active Tasks
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
    </div>
  );
}
