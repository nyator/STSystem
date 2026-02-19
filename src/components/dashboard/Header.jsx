import React from 'react'
import Button from '../ui/Button'
import { LuPlus } from 'react-icons/lu';

function Header({ icon, title, description }) {
    return (
        <div>
            <div className='flex items-end justify-between'>
                <div className='hidden sm:block'>
                    <div className='flex justify-start w-full items-center'>
                        {icon}
                        <h1 className='text-xl font-medium'>{title}</h1>
                    </div>
                    <p className='text-gray-400 text-xs'>{description}</p>
                </div>
                <div>
                    <Button variant="primary"><LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />Create Ticket</Button>
                </div>
            </div>
        </div>
    )
}

export default Header