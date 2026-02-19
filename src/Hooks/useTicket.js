import { useQuery } from "@tanstack/react-query"
import axios from "axios"
function useTicket() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['ticket'],
        queryFn: (ticketId) => axios.get(`/tickets/${ticketId}`).then(res => res.data)
    })
    return { data, error, isLoading }
}

export default useTicket

// to fetch a single ticket by its id, the ticket id should be passed as an argument to the hook
// the hook should return the ticket data, any error that may occur and a loading state to indicate that the request is being processed