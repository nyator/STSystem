
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Button from './Button';

function Pagination({ currentPage, totalPages, totalItems, onPrev, onNext, itemLabel = "Tickets" }) {
    return (
        <div className="mt-3 flex w-full flex-row items-center justify-between text-xs">
            <div className='flex flex-row items-center space-x-1'>
                <p className="font-medium text-gray-600 dark:text-gray-300">{totalItems} {itemLabel}</p>
                <p className="text-gray-300 dark:text-gray-700">/</p>
                <p className="text-gray-500 dark:text-gray-400">page {currentPage} of {totalPages}</p>
            </div>
            <div className='flex flex-row space-x-1 '>
                <Button onClick={onPrev} disabled={currentPage === 1}>
                    <LuChevronLeft className='text-lg' />
                    {/* <span className='hidden md:inline pr-2'>Back</span> */}
                </Button>
                <Button onClick={onNext} disabled={currentPage === totalPages}>
                    {/* <span className='hidden md:inline pl-2'>Next</span> */}
                    <LuChevronRight className='text-lg ' />
                </Button>
            </div>
        </div>
    );
}

export default Pagination;
