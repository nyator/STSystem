import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTicket } from "../../utils/TicketUtil"

function useDeleteTicket() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    })

    return {
        deleteTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useDeleteTicket