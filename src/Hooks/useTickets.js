import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function useTickets() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: () => axios.get('/tickets').then(res => res.data)
    })
    return { data, error, isLoading }
}

export default useTickets

// to fetch all tickets, the hook should return an array of tickets, any error that may occur and a loading state to indicate that the request is being processed