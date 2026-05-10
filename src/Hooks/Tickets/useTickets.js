import { useQuery } from "@tanstack/react-query"
import { getTickets } from "../../utils/TicketUtil"
import { useAuth } from "../useAuth"
import { canViewTicket } from "../../utils/AuthUtil"

function useTickets() {
    const { user } = useAuth()
    const { data, error, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
        staleTime: 0,
        gcTime: 1.8e+6, //After 60 mins, cache is cleared 
        refetchOnMount: true,  //Important for localStorage sync
    })
    const visibleData = data?.filter((ticket) => canViewTicket(user, ticket)) || []
    return { data: visibleData, error, isLoading }
}

export default useTickets
