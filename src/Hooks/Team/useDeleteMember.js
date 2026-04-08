import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMembers } from "../../utils/TeamUtil"

function useDeleteMember() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteMembers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["team"] });
        }
    })

    return {
        deleteMember: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useDeleteMember