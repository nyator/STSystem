import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import Button from './Button'

function Pagination() {
    return (
        <div className="w-full flex flex-row items-end justify-between mt-5">
            <div className='flex flex-row items-center space-x-1'>
                <p>n Tickets </p>
                <p>|</p>
                <p>page{"n"} of {"nTotal"}</p>
            </div>


            <div className='flex flex-row space-x-1'>
                <Button onClick={() => { }}>
                    <LuChevronLeft className='text-lg' />
                    <span className='hidden md:inline pr-2'>
                        Back
                    </span>
                </Button>
                <Button onClick={() => { }}>
                    <span className='hidden md:inline pl-2'>
                        Next
                    </span>
                    <LuChevronRight className='text-lg ' />
                </Button>
                {/* <p>{currentPage} / {totalPages}</p> */}
            </div>
        </div>
    )
}

export default Pagination