import MemberPill from "../ui/MemberPill";

function TicketAssigneeRow({ members = [], assignedTo }) {
  const assignedMembers = members.filter((member) => assignedTo === member.id);

  if (!assignedMembers.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {assignedMembers.map((member) => (
        <MemberPill key={member.id} member={member} />
      ))}
    </div>
  );
}

export default TicketAssigneeRow;
