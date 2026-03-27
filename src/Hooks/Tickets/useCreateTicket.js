import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTicket } from "../../utils/TicketUtil";

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
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useCreateTicket