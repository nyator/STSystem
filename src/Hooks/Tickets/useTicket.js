import { useQuery } from "@tanstack/react-query"
import { getTicket } from "../../service/ticketService"

function useTicket(ticketId) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: () => getTicket(ticketId),
        enabled: !!ticketId,
    })
    return {
        ticket: data,
        error,
        isLoading
    }
}

export default useTicket