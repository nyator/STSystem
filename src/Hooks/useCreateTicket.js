import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { saveTicket } from "../utils/TicketService";

function useCreateTicket() {
    const queryCleint = useQueryClient()

    const mutation = useMutation({
        mutationFn: saveTicket,
        onSuccess: () => {
            queryCleint.invalidateQueries({ queryKey: ["tickets"] })
        }
    })
    return {
        createTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useCreateTicket