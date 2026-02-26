import { useQuery } from "@tanstack/react-query"
import { getTickets } from "../utils/TicketUtil"

function useTickets() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
        
    })
    return { data, error, isLoading }
}

export default useTickets