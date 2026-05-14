import MemberPill from "../ui/MemberPill";
import { LuUsersRound } from "react-icons/lu";

function TicketAssigneeRow({ members = [], assignedTo }) {
  const assignedMembers = members.filter((member) => assignedTo === member.id);

  if (!assignedMembers.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1">
      <LuUsersRound size={12} className="text-gray-700 dark:text-gray-400" />
      <p className="text-xs">Assingee:</p>
      {assignedMembers.map((member) => (
        <MemberPill key={member.id} member={member} />
      ))}
    </div>
  );
}

export default TicketAssigneeRow;
