import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assignTicket } from "../../utils/TicketUtil";
import toast from "react-hot-toast";

function useAssignTicket() {
    const queryClient = useQueryClient()

    const Mutation = useMutation({
        mutationFn: ({ ticketId, assigneeId }) => assignTicket(ticketId, assigneeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
            toast.success("Tasked Assigned Sucessfully")

        },
    })

    return {
        assignTicket: Mutation.mutate,
        isLoading: Mutation.isPending,
    }
}

export default useAssignTicket