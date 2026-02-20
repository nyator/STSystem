import { useQuery } from "@tanstack/react-query"
import { getTickets } from "../utils/TicketService"

function useTickets() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
    })
    return { data, error, isLoading }
}

export default useTickets