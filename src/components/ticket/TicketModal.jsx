import { createPortalBody } from '../../utils/createPortal'
import Button from '../ui/Button'
import { LuBadgeInfo, LuX } from 'react-icons/lu'

function TicketModal({ isOpen, onClose, title, LAction, RVariant, RAction, children, submit, error, disabled, TitleIcon, LIcon, RIcon, ticketId }) {

    const handleContentClick = (e) => {
        e.stopPropagation();
    }

    if (!isOpen) return null;

    return createPortalBody(
        <div
            onClick={onClose}
            className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-screen h-screen'
        >
            <div
                onClick={handleContentClick}
                className='bg-white dark:bg-gray-800 p-2 px-6 rounded-2xl shadow-lg w-96 max-h-[90vh] overflow-y-auto relative'
            >
                <button
                    type="button"
                    onClick={onClose}
                    className='group absolute right-4 top-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-2xl leading-none p-2 rounded-lg ease-in-out duration-300'
                    aria-label="Close modal"
                >
                    <LuX className='group-hover:rotate-90 text-sm transition-transform duration-300 ease-in-out group-hover:text-black dark:group-hover:text-white text-gray-600 dark:text-gray-100' />
                </button>

                <div className='flex justify-center items-center mb-4 p-2'>
                    <h2 className='flex flex-row items-center text-2xl text-center font-semibold dark:text-white gap-1.5'>
                        {title}{" "}
                        {TitleIcon}
                        <span className='font-bold text-2xl'>{ticketId}</span>
                    </h2>
                </div>

                <div className='text-gray-600 dark:text-gray-300 items-center'>
                    {children}
                </div>



                <div className='flex justify-center gap-2 mt-6 relative'>
                    {error &&
                        <div className='absolute -top-6 flex items-center justify-center space-x-1.5 text-red-600 px-2 text-[12px] rounded-2xl w-full'>
                            <LuBadgeInfo />
                            <p>enter valid inputs into fields</p>
                        </div>
                    }
                    {LAction &&
                        <Button variant="default" onClick={onClose}>
                            {LIcon}
                            {LAction}
                        </Button>
                    }
                    <Button variant={RVariant || "primary"} type="submit" disabled={disabled} onClick={submit}>
                        {RIcon}
                        {RAction}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default TicketModal