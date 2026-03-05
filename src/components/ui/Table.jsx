import TicketModal from "../ticket/TicketModal";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

import { FormInput, FormTextArea } from "./Input";
import { LuSquarePen, LuMail, LuTicketSlash } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import useTicket from "../../Hooks/useTicket";
import useEditTicket from "../../Hooks/useEditTicket";
import { OptionButton } from '../ui/Button'

function Table({ columns, title, data = [], currentPage = 1, totalPages = 1, totalItems = 0, onPrev, onNext }) {
    const cols = (columns && columns.length) ? columns : (data.length ? Object.keys(data[0]).map(key => ({ key, title: key })) : []);

    // Track the selected row's id instead of a boolean
    const [selectedRowId, setSelectedRowId] = useState(null);
    const { ticket } = useTicket(selectedRowId);
    const { updateTicket } = useEditTicket()
    const [selectedPriority, setSelectedPriority] = useState("low")
    const [selectedStatus, setSelectedStatus] = useState("open")
    const [openDropdown, setOpenDropdown] = useState(null)

    const priorityOptions = [
        { label: "Low", value: "low", onClick: () => handlePriorityChange("low") },
        { label: "Medium", value: "medium", onClick: () => handlePriorityChange("medium") },
        { label: "High", value: "high", onClick: () => handlePriorityChange("high") },
    ]

    const statusOptions = [
        { label: "Open", value: "open", onClick: () => handleStatusChange("open") },
        { label: "In-progress", value: "in-progress", onClick: () => handleStatusChange("in-progress") },
        { label: "Resolved", value: "resolved", onClick: () => handleStatusChange("resolved") },
    ]

    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            email: "",
            description: "",
            priority: "low",
            status: "open",
        }
    })

    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title || "",
                email: ticket.customerEmail || "",
                description: ticket.description || "",
            })
            setSelectedPriority(ticket.priority || "low")
            setSelectedStatus(ticket.status || "open")
            // Set values in react-hook-form
            setValue("priority", ticket.priority || "low")
            setValue("status", ticket.status || "open")
        }
    }, [ticket, reset, setValue])

    // Update react-hook-form when local state changes
    const handlePriorityChange = (value) => {
        setSelectedPriority(value)
        setValue("priority", value)
    }

    const handleStatusChange = (value) => {
        setSelectedStatus(value)
        setValue("status", value)
    }

    const onSubmit = (data) => {
        // Get the current values from react-hook-form to ensure we have the latest
        const formValues = getValues()
        updateTicket({
            ticketId: ticket.id,
            title: data.title,
            email: data.email,
            description: data.description,
            priority: formValues.priority || selectedPriority,
            status: formValues.status || selectedStatus
        })
        setSelectedRowId(null)
        toast.success("Ticket Updated Successfully")
    }

    const stickyHeaderClass = "sticky left-0 z-0 bg-gray-50 rounded-tl-xl";
    const stickyClass = "sticky left-0 z-0 bg-white group-hover:bg-gray-50 text-nowrap transition-all duration-100 ease-in";

    return (
        <>
            <TicketModal
                isOpen={selectedRowId !== null}
                onClose={() => setSelectedRowId(null)}
                TitleIcon={<LuTicketSlash className='mr-2' />}
                LAction="Cancel"
                RAction="Update Ticket"
                RIcon={<LuSquarePen size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                ticketId={selectedRowId}
                // submit={alert('qrwe')}
                submit={handleSubmit(onSubmit)}

            >
                <form id="edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput
                        name="title"
                        placeholder="Enter Ticket Title"
                        register={register}
                        formfields={{ required: "Title is required" }}
                        error={errors.title}
                    />
                    <FormInput
                        name="email"
                        placeholder="Enter customer email"
                        icon={<LuMail className="absolute left-3 top-3 text-gray-700" size={15} />}
                        register={register}
                        formfields={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                        }}
                        error={errors.email}
                    />
                    <FormTextArea
                        name="description"
                        placeholder="Enter Ticket Description"
                        register={register}
                        formfields={{ required: "Description is required" }}
                        error={errors.description}
                    />
                    <div className='flex space-x-2 justify-center'>
                        <OptionButton
                            title="Priority"
                            options={priorityOptions}
                            selected={selectedPriority}
                            isOpen={openDropdown === 'priority'}
                            setIsOpen={(open) => setOpenDropdown(open ? 'priority' : null)}
                        >
                            Priority
                        </OptionButton>
                        <OptionButton
                            title="Status"
                            options={statusOptions}
                            selected={selectedStatus}
                            isOpen={openDropdown === 'status'}
                            setIsOpen={(open) => setOpenDropdown(open ? 'status' : null)}
                        >
                            Status
                        </OptionButton>
                    </div>
                </form>

            </TicketModal>

            <div className="flex-col flex items-center w-full">
                <h1 className="font-black text-2xl">{title}</h1>
                <div className='flex flex-col rounded-xl border border-gray-200 items-center w-full max-h-screen overflow-auto'>
                    <div className="w-full relative overflow-x-auto rounded-t-xl">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium text-nowrap sticky top-0">
                                <tr className="w-full">
                                    {cols.map((col, index) => (
                                        <th key={col.key} className={`text-left p-3 ${index === 0 ? stickyHeaderClass : ''}`}>
                                            {col.title || col.key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={cols.length} className="p-3 text-center">No data</td>
                                    </tr>
                                ) : data.map((row, idx) => (                                    <tr
                                        key={idx}
                                        onClick={() => setSelectedRowId(row.id)}
                                        className={`group border-gray-200 text-nowrap hover:bg-gray-50 cursor-pointer transition-all duration-100 ease-in ${idx === data.length - 1 ? 'border-b-0' : 'border-b'}`}
                                    >
                                        {cols.map((col, index) => (
                                            <td
                                                key={col.key}
                                                className={`text-left p-2 ${index === 0 ? stickyClass : ''}`}
                                                onClick={col.key === 'actions' ? (e) => e.stopPropagation() : undefined}
                                            >
                                                {col.render ? col.render(row, idx) : (row[col.key] ?? '')}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} onPrev={onPrev} onNext={onNext} />
            </div>
        </>
    );
}
export default Table;