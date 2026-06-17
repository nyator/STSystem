import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTicket } from "../../service/ticketService";
import toast from 'react-hot-toast'

function useEditTicket() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ ticketId, ...ticketData }) => editTicket(ticketId, ticketData),
        onSuccess: (_, { ticketId }) => {
            queryClient.invalidateQueries({ queryKey: ['tickets'] })
            queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] })
            toast.success("Ticket Updated Successfully")
        }
    })

    return {
        updateTicket: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    }
}

export default useEditTicket