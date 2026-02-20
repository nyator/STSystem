import React from 'react'
import Button from '../ui/Button'
import { LuPlus } from 'react-icons/lu';

function Header({ icon, title, description }) {
    return (
        <div>
            <div className='flex items-end justify-between'>
                <div className='hidden sm:block'>
                    <div className='flex justify-start w-full items-end '>
                        <div className="rounded-lg bg-blue-50 p-1 w-fit text-blue-500">
                            {icon}
                        </div>
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