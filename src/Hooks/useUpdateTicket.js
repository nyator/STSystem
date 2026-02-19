import { useMutation } from "@tanstack/react-query"

function useUpdateTicket() {
    const mutation = useMutation({
        mutationFn: ({ ticketId, updatedData }) => {
            console.log('Updating ticket with id: ', ticketId, ' and data: ', updatedData);
            return axios.put(`/tickets/${ticketId}`, updatedData)
        }
    })

    return {
        updateTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }

}