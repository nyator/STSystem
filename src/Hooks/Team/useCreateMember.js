import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createMember } from "../../service/teamService";

function useCreateMember() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team'] });
        }
    });

    return {
        createMember: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    };
}

export default useCreateMember