import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTicket } from "../../utils/TicketUtil"

function useEditTicket() {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ ticketId, ...ticketData }) => editTicket(ticketId, ticketData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
        }
    })
    return {
        updateTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}
export default useEditTicket