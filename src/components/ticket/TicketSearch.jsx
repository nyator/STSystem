import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import useDebounce from '../../hooks/useDebounce'
import Input from '../ui/Input'
import { getTickets } from '../../utils/TicketService'

function TicketSearch({ onResults }) {

    const { register, watch } = useForm()
    const searchValue = watch('search', '')
    const debouncedValue = useDebounce(searchValue, 1000)

    const { data: tickets = [] } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets
    })


    const filteredTickets = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        ticket.customerEmail.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        ticket.id.toLowerCase().includes(debouncedValue.toLowerCase())
    )
    onResults?.(filteredTickets)
    console.log(filteredTickets)

    return (
        <Input
            name="search"
            placeholder="Search id, title, email..."
            register={register}
        />
    )
}

export default TicketSearch