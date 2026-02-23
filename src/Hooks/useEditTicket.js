import { useMutation } from "@tanstack/react-query"
import { editTicket } from "../utils/TicketService"

function useEditTicket() {

    const mutation = useMutation({
        mutationFn: editTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
        }
    })
    return mutation
}
export default useEditTicket