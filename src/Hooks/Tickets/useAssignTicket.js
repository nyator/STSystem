import { useMutation, useQueryClient } from "@tanstack/react-query"
import { assignTicket } from "../../service/ticketService";
import toast from "react-hot-toast";

function useAssignTicket() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ ticketId, assignedTo, actor }) => assignTicket(ticketId, assignedTo, actor),
        onSuccess: (_, { ticketId }) => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
            queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] })

            toast.success("Tasked Assigned Sucessfully")

        },
    })

    return {
        assignTicket: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    }
}

export default useAssignTicket
