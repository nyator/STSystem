import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from 'react'
import useDebounce from '../../Hooks/Tickets/useDebounce'
import Input from '../ui/Input'
import { getTickets } from '../../service/ticketService'

function TicketSearch({ onResults }) {

    const { register, watch } = useForm()
    const searchValue = watch('search', '')
    const debouncedValue = useDebounce(searchValue, 500)

    const { data: tickets = [] } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets
    })

    useEffect(() => {
        const filteredTickets = tickets.filter((ticket) =>
            ticket.title.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            ticket.customerEmail.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            ticket.id.toLowerCase().includes(debouncedValue.toLowerCase())
        )
        if (debouncedValue) {
            onResults?.(filteredTickets)
        } else {
            onResults?.(tickets)
        }
    }, [debouncedValue, tickets])

    return (
        <Input
            name="search"
            placeholder="Search id, title, email..."
            register={register}
        />
    )
}

export default TicketSearch
