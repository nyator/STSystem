import axios from "axios"
import { useMutation } from "@tanstack/react-query"

import { saveTicket } from "../utils/TicketService";

function useCreateTicket() {
    const mutation = useMutation({
        mutationFn: saveTicket,
    })

    return {
        createTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useCreateTicket