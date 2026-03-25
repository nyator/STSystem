import { useState } from 'react'
import Button, { OptionButton } from '../ui/Button'
import { useForm } from 'react-hook-form';
import { LuPlus, LuMail } from 'react-icons/lu';
import TicketModal from '../ticket/TicketModal';
import { FormInput, FormTextArea } from '../ui/Input'
import useCreateTicket from '../../Hooks/Tickets/useCreateTicket';
import toast from 'react-hot-toast';


function Header({ icon, title, description }) {
    const [openModal, setOpenModal] = useState(false)
    const [selectedPriority, setSelectedPriority] = useState("low")
    const [isOpen, setIsOpen] = useState(null)

    const { createTicket, isLoading } = useCreateTicket();
    const { register, handleSubmit, trigger, reset, formState: { errors } } = useForm()


    const priorityOptions = [
        { label: "Low", value: "low", onClick: () => setSelectedPriority("low") },
        { label: "Medium", value: "medium", onClick: () => setSelectedPriority("medium") },
        { label: "High", value: "high", onClick: () => setSelectedPriority("high") },
    ]

    const onSubmit = (data) => {
        createTicket({ ...data, priority: selectedPriority }, {
            onSuccess: () => {
                toast.success("Tickets Created!")
                reset()
                setSelectedPriority(undefined)
                setOpenModal(false)
            },
            onError: () => {
                toast.error("Error creating tickets!")
            }
        })
    }


    return (
        <div>
            <div className='flex items-end justify-between z-0'>
                <div className='block'>
                    <div className='flex justify-start w-full items-end space-x-2'>
                        <div className="rounded-lg bg-blue-50 dark:bg-blue-900 p-1  w-fit text-blue-500">
                            {icon}
                        </div>
                        <h1 className='text-xl font-semibold dark:text-white'>{title}</h1>
                    </div>
                    <p className='text-gray-400 dark:text-gray-500 text-xs hidden sm:block'>{description}</p>
                </div>

                <Button variant="primary" onClick={() => setOpenModal(true)}>
                    <LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />
                    New Ticket
                </Button>
            </div>

            <TicketModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="New Ticket"
                LAction="Cancel"
                RAction="Create Ticket"
                RIcon={<LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                submit={handleSubmit(onSubmit)}
                error={errors.title || errors.email || errors.description}
            >
                <form className="space-y-4">
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
                        icon={<LuMail className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
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
                    <div className='flex space-x-2'>
                        <OptionButton
                            title="Priority"
                            options={priorityOptions}
                            selected={selectedPriority}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        >
                            Priority
                        </OptionButton>

                    </div>
                </form>
            </TicketModal>
        </div>
    )
}

export default Header