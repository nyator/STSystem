import { useMutation, useQueryClient } from "@tanstack/react-query"
import { saveTicket } from "../utils/TicketUtil";

function useCreateTicket() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: saveTicket,
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