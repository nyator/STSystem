import { useQuery } from "@tanstack/react-query"
import { getTicket } from "../utils/TicketService"

function useTicket() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['ticket'],
        queryFn: getTicket,
    })
    return { data, error, isLoading }
}

export default useTicket