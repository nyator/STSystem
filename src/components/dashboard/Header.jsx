import { useState } from 'react'
import Button, { OptionButton } from '../ui/Button'
import { useForm } from 'react-hook-form';
import { LuPlus, LuMail } from 'react-icons/lu';
import TicketModal from '../ticket/TicketModal';
import { FormInput, FormTextArea } from '../ui/Input'
import useCreateTicket from '../../Hooks/useCreateTicket';


function Header({ icon, title, description }) {
    const [openModal, setOpenModal] = useState(false)
    const { register, handleSubmit, trigger, reset, formState: { errors } } = useForm()

    const { createTicket, isLoading } = useCreateTicket();

    const onSubmit = (data) => {
        createTicket(data, {
            onSuccess: () => {
                // setToast({ message: "Ticket created!", type: "success" })
                reset()
                setOpenModal(false)
            },
            onError: () => {
                // setToast({ message: "Something went wrong", type: "error" })
            }
        })

    }


    return (
        <div>
            <div className='flex items-end justify-between'>
                <div className='hidden sm:block'>
                    <div className='flex justify-start w-full items-end'>
                        <div className="rounded-lg bg-blue-50 p-1 w-fit text-blue-500">
                            {icon}
                        </div>
                        <h1 className='text-xl font-medium'>{title}</h1>
                    </div>
                    <p className='text-gray-400 text-xs'>{description}</p>
                </div>

                <Button variant="primary" onClick={() => setOpenModal(true)}>
                    <LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />
                    Create Ticket
                </Button>
            </div>

            <TicketModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="New Ticket"
                LAction="Cancel"
                RAction={"Create Ticket"}
                RIcon={<LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />
                }
                submit={handleSubmit(onSubmit)}
            >
                <form className="space-y-4">
                    <FormInput
                        name="title"
                        placeholder="Enter Ticket Title"
                        register={register}
                        formfields={{ required: true }}
                        error={errors.title}
                    />
                    <FormInput
                        name="email"
                        placeholder="Enter customer email"
                        icon={<LuMail className="absolute left-3 top-3 text-gray-500" size={15} />}
                        register={register}
                        formfields={{ required: true }}
                        error={errors.email}
                    />
                    <FormTextArea
                        name="description"
                        placeholder="Enter Ticket Description"
                        register={register}
                        formfields={{ required: true }}
                        error={errors.description}
                    />

                    {/* <div className='flex space-x-2'>
                        <OptionButton options={priorityOptions}>Priority</OptionButton>
                    </div> */}
                </form>
            </TicketModal>
        </div>
    )
}

export default Header