import { LuMail, LuTicket, LuClock, LuTrash2 } from 'react-icons/lu';
import Button from '../ui/Button';

const MemberCard = ({ user }) => {
    const {
        firstName = "Alex",
        lastName = "Rivera",
        status = "Active", // Active, Away, Offline
        team = "Frontend",
        email = "alex@company.com",
        avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=6d83c4&color=fff`,
        ticketsAssigned = 0,
        inProgress = 0,
        avgResponse = "1.5h"
    } = user || {};

    const name = `${firstName} ${lastName}`;

    const statusColors = {
        active: "bg-green-500",
        inactive: "bg-amber-500",
    };

    return (
        <div className="group relative w-full items-center bg-white dark:bg-slate-300 rounded-2xl border border-slate-100 p-5  transition-all duration-300 hover:shadow-sm hover:border-slate-200 space-y-0.5">
            {/* Top Header: Avatar & Status */}

            <div className="flex items-start justify-between gap-4">
                {/* User Info */}
                <div className="">
                    <h3 className="text-sm font-bold text-slate-800 leading-tight">{name}</h3>
                    <div className="flex items-center text-xs text-slate-800">
                        {email}
                    </div>
                    <p className="text-xs font-medium text-slate-400 leading-tight text-[10px] uppercase">{team}</p>
                </div>


                <div className="relative">
                    <img
                        src={avatar}
                        alt={name}
                        className="h-7 w-7 rounded-xl object-cover ring-1 ring-white dark:ring-slate-300 shadow-sm"
                    />
                    <span className={`absolute -top-1 -left-1 h-3 w-3 rounded-full border-[1.5px] border-white dark:border-slate-300 ${statusColors[status] || statusColors.Offline}`} />
                </div>
            </div>



            {/* Divider */}
            <div className="my-2 border-t border-slate-100" />

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
            <div className="mt-2 overflow-hidden flex items-center justify-between">
                <button className="w-2/3 text-xs hover:underline py-2 font-medium cursor-pointer  text-black transition-all ">
                    Assign Ticket
                </button>
                <button onClick={() => { }}>
                    <LuTrash2 size={16} className="text-red-500 text-sm cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default MemberCard;