import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from 'react'
import useDebounce from '../../Hooks/Tickets/useDebounce'
import Input from '../ui/Input'
import { getMember } from "../../utils/TeamUtil"

function AssignSearch({ onResults }) {

    const { register, watch } = useForm()
    const searchValue = watch('search', '')
    const debouncedValue = useDebounce(searchValue, 500)

    const { data: members = [] } = useQuery({
        queryKey: ['team'],
        queryFn: getMember
    })

    useEffect(() => {
        const filteredMembers = members.filter((member) =>
            member.team.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            member.firstname.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            member.lastName.toLowerCase().includes(debouncedValue.toLowerCase())
        )
        if (debouncedValue) {
            onResults?.(filteredMembers)
        } else {
            onResults?.(members)
        }
    }, [debouncedValue, members, onResults])

    // console.log(onResults)

    return (
        <Input
            name="search"
            placeholder="Search member or team..."
            register={register}
        />
    )
}

export default AssignSearch