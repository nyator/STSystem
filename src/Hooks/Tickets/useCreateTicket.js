import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTicket } from "../../service/ticketService";

function useCreateTicket() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
        }
    })
    
    return {
        createTicket: mutation.mutate,
        createTicketAsync: mutation.mutateAsync,
        // isLoading: mutation.isLoading,
        isPending: mutation.isPending,
        error: mutation.error,
    }
}

export default useCreateTicket