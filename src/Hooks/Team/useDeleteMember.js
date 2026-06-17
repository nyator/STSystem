import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMember } from "../../service/teamService"

function useDeleteMember() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteMember,
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