import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAssign } from "../../utils/TeamUtil"

function useUpdateAssign() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ memberId, ticketId }) => updateAssign(memberId, ticketId),
        onSuccess: () => {
            
        }

    })

}

export default useUpdateAssign