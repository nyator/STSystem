import useMembers from '../../Hooks/Team/useMembers';
import MemberCard from './MemberCard';



export default function MemeberGroup() {
  const { data } = useMembers();

  // console.log("Members Data:", data);
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


        {data?.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No members found. Please add a member to get started.
          </div>
        )}

        {data?.map((member) => (
          <MemberCard
            key={member.id}
            user={member} />
        ))}

      </div>

    </div>
  )
}
