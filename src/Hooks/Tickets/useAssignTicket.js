import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assignTicket } from "../../utils/TicketUtil";

function useAssignTicket() {
    const queryClient = useQueryClient()

    const Mutation = useMutation({
        mutationFn: ({ ticketId, assigneeId }) => assignTicket(ticketId, assigneeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
        },
    })

    return {
        assignTicket: Mutation.mutate,
        isLoading: Mutation.isPending,
    }
}

export default useAssignTicket