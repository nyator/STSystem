import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../service/teamService";


function useMembers() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['team'],
        queryFn: getMembers,
        staleTime: 0, //fresh" for 30 minutes
        gcTime: 1.8e+6, //After 60 mins, cache is cleared 
        refetchOnMount: true,  //Important for localStorage sync
    })
    return { data, error, isLoading }
}

export default useMembers