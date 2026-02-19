import { useMutation } from "@tanstack/react-query"
import axios from "axios"

function useDeleteTicket() {
    const mutation = useMutation({
        mutationFn: (ticketId) => {
            console.log('Deleting ticket with id: ', ticketId);
            return axios.delete(`/tickets/${ticketId}`)
        }
    })

    return {
        deleteTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useDeleteTicket


// take in the ticket id and send a request to the backend to delete the ticket
// return the response from the backend and any error that may occur
// also return a loading state to indicate that the request is being processed