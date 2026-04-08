import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from 'react'
import useDebounce from '../../Hooks/Tickets/useDebounce'
import Input from '../ui/Input'
import { getMembers } from "../../utils/TeamUtil"

function AssignSearch({ onResults }) {

    const { register, watch } = useForm()
    const searchValue = watch('search', '')
    const debouncedValue = useDebounce(searchValue, 500)

    const { data: members = [] } = useQuery({
        queryKey: ['team'],
        queryFn: getMembers
    })

   useEffect(() => {
    if (!debouncedValue) {
        onResults?.(null)  // reset to null so parent falls back to members
        return
    }
    const filteredMembers = members.filter((member) =>
        member.team.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        member.firstName.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        member.lastName.toLowerCase().includes(debouncedValue.toLowerCase())
    )
    onResults?.(filteredMembers)
}, [debouncedValue, members])  // remove onResults from deps — it changes every render

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