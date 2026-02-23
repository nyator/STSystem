import React from 'react'
import Button from '../ui/Button'
import { LuX } from 'react-icons/lu'

function TicketModal({ isOpen, onClose, title, LAction, RAction, children, submit, LIcon, RIcon }) {
    const handleContentClick = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'
                >
                    <div
                        onClick={handleContentClick}
                        className='bg-white p-2 px-6 rounded-2xl shadow-lg w-96 max-h-[90vh] overflow-y-auto relative'
                    >
                        <button
                            onClick={onClose}
                            className=' group absolute right-4 top-3.5 bg-gray-100 hover:bg-gray-200 text-2xl leading-none p-2 rounded-lg ease-in-out duration-300'
                            aria-label="Close modal"
                        >
                            <LuX className='group-hover:rotate-90 text-sm group-transition-transform duration-300 ease-in-out group-hover:text-gray-600 text-gray-400' />
                        </button>
                        <div className='flex justify-center items-center mb-4 p-2 '>
                            <h2 className='text-xl text-center font-semibold'>{title}</h2>
                        </div>

                        <div className='text-gray-600'>
                            {children}
                        </div>

                        <div className='flex justify-center gap-2 mt-6'>
                            <Button variant="default" onClick={onClose}>
                                {LIcon}
                                {LAction}
                            </Button>
                            <Button variant="primary" type="submit" onClick={submit}>
                                {RIcon}
                                {RAction}
                            </Button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default TicketModal