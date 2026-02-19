import { useMutation } from "@tanstack/react-query"
import axios from "axios"

function useCreateTicket() {
    const mutation = useMutation({
        mutationFn: (ticketData) => {
            console.log('data recieved: ', ticketData);
            const newTicket = {
                ticketNumber: `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                title: ticketData.title,
                description: ticketData.description,
                customerEmail: ticketData.email,
                priority: ticketData.priority,
                status: ticketData.status,
                createdAt: new Date().toISOString(),
            };
            console.log('Creating ticket with data: ', newTicket);
            return axios.post('/tickets', newTicket)
        }
    })

    return {
        createTicket: mutation.mutate,
        isLoading: mutation.isLoading,
        error: mutation.error,
    }
}

export default useCreateTicket


// take in the form data and send it to the backend to create a new ticket
// the form data should include the title, description, priority, status and any other relevant information for the ticket
// auto create a ticket number and set the created date to the current date and time
// return the response from the backend and any error that may occur
// also return a loading state to indicate that the request is being processed