import { useEffect, useState } from 'react';
import { LuChevronRight, LuX, LuLayoutDashboard, LuTicket, LuUsers, LuSettings, LuLogOut } from 'react-icons/lu';
import MainContent from './MainContent';

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);


    const [activeMenu, setActiveMenu] = useState(() => {
        const savedMenu = localStorage.getItem('activeMenu');
        return savedMenu ? JSON.parse(savedMenu) : 'Dashboard';
    });

    useEffect(() => {
        localStorage.setItem('activeMenu', JSON.stringify(activeMenu));
    }, [activeMenu]);

    const menuItems = [
        { icon: LuLayoutDashboard, label: 'Dashboard' },
        { icon: LuTicket, label: 'Tickets' }
    ];

    return (
        <div className="flex h-screen">
            <div
                className={`${isOpen ? 'w-44' : 'w-20'
                    } bg-white transition-all duration-300 h-full flex flex-col border-r border-gray-200 overflow-hidden`}>

                {/* Header */}
                <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} px-4 py-5 border-b border-gray-200`}>
                    {isOpen && <h1 className="text-sm font-bold text-nowrap">HelpDesk Lite</h1>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-gray-200 bg-gray-50 rounded-lg border-2 border-gray-100"
                    >
                        <LuChevronRight size={15} className={`${isOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
                    </button>
                </div>


                <nav className={`flex ${isOpen ? 'items-start' : 'items-center'} flex-col justify-start flex-1 p-4 space-y-2`}>
                    {menuItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveMenu(item.label)}
                            className={`flex space-x-3 p-2 items-start rounded-lg border-2 ${isOpen ? 'justify-start' : 'justify-center'} ${activeMenu === item.label ? 'bg-blue-500 border-blue-500 text-white' : ' bg-gray-50 border-gray-100'} ${activeMenu === item.label ? 'hover:bg-blue-600' : 'hover:bg-gray-200'} transition-all duration-300 ${isOpen ? 'w-full' : ''}`}
                        >
                            <item.icon size={15} />
                            {isOpen ? <span className="text-xs font-medium">{item.label}</span> : null}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="flex-1 overflow-auto h-full">
                <MainContent selectedMenu={activeMenu} />
            </div>
        </div>
    );
}