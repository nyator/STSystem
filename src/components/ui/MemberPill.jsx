import { LuX } from "react-icons/lu";

function MemberPill({ member, onRemove }) {
  if (!member) return null;

  const fullName = `${member.firstName} ${member.lastName}`;

  return (
    <div className="flex w-fit items-center pl-1 pr-2 py-1 rounded-full bg-gray-50 dark:bg-blue-900/50 border border-gray-200 dark:border-blue-700 text-gray-700 dark:text-blue-300 text-xs font-medium">
      <img
        src={member.avatar}
        alt={fullName}
        className="w-5 h-5 rounded-full mr-1"
      />
      {fullName}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:text-blue-900 dark:hover:text-blue-100 transition-colors cursor-pointer"
          aria-label={`Remove ${fullName}`}
        >
          <LuX size={11} />
        </button>
      )}
    </div>
  );
}

export default MemberPill;
