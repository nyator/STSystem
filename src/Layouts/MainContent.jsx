import { useState } from 'react'
import Dashboard from '../pages/Dashboard'
import Ticket from '../pages/Ticket'
import TicketModal from '../components/ticket/TicketModal'
import { FormInput, FormTextArea } from '../components/ui/Input'

import { LuMail } from 'react-icons/lu'

// import { useForm } from 'react-hook-form'
import Button, { OptionButton } from '../components/ui/Button'



function MainContent({ selectedMenu }) {
  
    // const { register, handleSubmit, formState: { errors } } = useForm()


    return (
        <div>
            {selectedMenu === 'Dashboard' && <Dashboard />}
            {selectedMenu === 'Tickets' && <Ticket />}

            

            {/* <TicketModal isOpen={false} onClose={() => { }} title="New Ticket" LAction="Cancel" RAction="Create Ticket">
                <FormInput label="Ticket Title" name="title" placeholder="Enter Ticket Title" register={register} />
                <FormInput label="Customer Email" name="email" placeholder="Enter customer email" icon={<LuMail className="absolute left-3 top-3 text-gray-500" size={15} />} register={register} />
                <div className='flex flex-wrap gap-2'>
                    <OptionButton id="priority" isOpen={openId === 'priority'} onToggle={toggle}>Priority</OptionButton>
                    <OptionButton id="status" isOpen={openId === 'status'} onToggle={toggle}>Status</OptionButton>
                </div>
                <FormTextArea label="Ticket Description" name="description" placeholder="Enter Ticket Description" register={register} />
            </TicketModal> */}
        </div>
    )
}

export default MainContent