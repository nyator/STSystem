import { useQuery } from "@tanstack/react-query";
import { getMember } from "../../service/teamService";

function useMember(memberId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["member", memberId],
    queryFn: () => getMember(memberId),
    enabled: !!memberId,
    staleTime: 1000 * 60 * 30, // 30 mins
    gcTime: 1000 * 60 * 60, // 60 mins
  });

  return {
    member: data,
    isLoading,
    error,
  };
}

export default useMember;