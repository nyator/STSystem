import { useMutation } from "@tanstack/react-query"
import { deleteTicket } from "../utils/TicketService"

function useDeleteTicket() {
    const mutation = useMutation({
        mutationFn: deleteTicket
    })

    return {
        deleteTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useDeleteTicket