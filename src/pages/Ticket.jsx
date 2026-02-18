import { LuTicket, LuPlus } from 'react-icons/lu';
import Button from '../components/ui/Button';

function Ticket() {
    return (
        <div>
            <div className='sticky top-0 z-10 bg-white p-4 w-full'>
                <div className='flex items-end justify-between'>
                    <div className='hidden sm:block'>
                        <div className='flex justify-start w-full items-center'>
                            <LuTicket size={20} className="inline mr-2" />
                            <h1 className='text-xl font-medium'>Tickets</h1>
                        </div>
                        <p className='text-gray-400 text-xs'>Manage tickets and track performance.</p>
                    </div>
                    <div>
                        <Button variant="primary"><LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />New Ticket</Button>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex flex-col items-start bg-white p-4 w-[calc(100%-1rem)] min-h-screen mt-5 m-2 rounded-2xl'>

                </div>
            </div>
        </div>
    )
}

export default Ticket