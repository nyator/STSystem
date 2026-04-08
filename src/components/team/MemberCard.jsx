import { LuMail, LuTicket, LuClock, LuTrash2 } from 'react-icons/lu';
import { useState } from 'react';
import Button from '../ui/Button';
import DeleteMemberModal from './DeleteMemberModal';

const MemberCard = ({ user }) => {
    const {
        id,
        firstName = "Alex",
        lastName = "Rivera",
        team = "Frontend",
        email = "alex@company.com",
        avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=6d83c4&color=fff`,
        ticketsAssigned = 0,
    } = user || {};

    const [showModal, setShowModal] = useState(false);

    const name = `${firstName} ${lastName}`;

    return (
        <div className="group relative w-full items-center bg-gray-50/50 dark:bg-slate-3w00 rounded-2xl border border-slate-200 p-3 transition-all duration-300 hover:shadow-sm hover:border-slate-200 space-y-0.5">
            {/* Top Header: Avatar & Status */}

            <div className="flex items-start justify-between gap-3">
                {/* User Info */}
                <img
                    src={avatar}
                    alt={name}
                    className="h-7 w-7 rounded-xl object-cover ring-1 ring-white dark:ring-slate-300 shadow-sm"
                />
                <div>
                    <h3 className="text-xs font-bold text-slate-800 leading-tight">{name}</h3>
                    <div className="flex items-center text-xs text-slate-800">
                        {email}
                    </div>
                    <p className="text-xs text-slate-400 leading-tight text-[10px] uppercase">{team}</p>
                </div>

            </div>



            {/* Divider */}
            <div className="my-2 border-t border-slate-200" />

            {/* Stats Grid */}
            <div className="">
                <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <LuTicket size={16} />
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-slate-700">{ticketsAssigned} Assigned</p>
                    </div>
                </div>

            </div>

            {/* Quick Action Button (Visible on Hover) */}
            <div className="mt-2 overflow-hidden flex items-center justify-center relative">
                <button className="w-2/3 text-xs hover:underline py-2 font-medium cursor-pointer  text-black transition-all ">
                    Assign Ticket
                </button>

                {ticketsAssigned <= 1 &&
                    <button
                        onClick={() => setShowModal(true)}
                        className='absolute right-0'>
                        <LuTrash2 size={14} className="text-red-500 text-sm cursor-pointer active:scale-[0.92]" />
                    </button>
                }
            </div>
            {showModal && <DeleteMemberModal MemberId={id} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default MemberCard;