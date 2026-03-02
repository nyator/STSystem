import { useQuery } from "@tanstack/react-query"
import { getTickets } from "../utils/TicketUtil"

function useTickets() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
        staleTime: 0, //fresh" for 30 minutes
        gcTime: 1.8e+6, //After 60 mins, cache is cleared 
        refetchOnMount: true,  //Important for localStorage sync
    })
    return { data, error, isLoading }
}

export default useTickets