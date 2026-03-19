import { useEffect, useState } from 'react';
import { LuChevronRight, LuLayoutDashboard, LuSettings, LuTicket, LuUsersRound } from 'react-icons/lu';
import MainContent from './MainContent';
import { getLocalStorage, setLocalStorage } from "../Hooks/useLocalStorage"

import logo from '../assets/logo.png'

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);

    const [activeMenu, setActiveMenu] = useState(() => {
        const saved = getLocalStorage('activeMenu')
        return saved || 'Dashboard'
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 700) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setLocalStorage('activeMenu', activeMenu)
    }, [activeMenu]);

    const menuItems = [
        { icon: LuLayoutDashboard, label: 'Dashboard' },
        { icon: LuTicket, label: 'Tickets' },
        { icon: LuUsersRound, label: 'Team' }
    ];

    return (
        <div className="flex h-screen">
            <div
                className={`${isOpen ? 'w-34' : 'w-12'
                    } bg-white dark:bg-gray-800 transition-all duration-300 h-full flex flex-col border-r border-gray-200 dark:border-gray-700 overflow-hidden`}>

                {/* Header */}
                <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} px-2 py-5 border-b mx-2 border-gray-200 dark:border-gray-700`}>
                    {isOpen && <img src={logo} className='w-8 h-8' />}
                    {/* {isOpen && <h1 className="text-xs font-bold text-nowrap pl-5">HDesk Lite</h1>} */}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-50/50 dark:bg-gray-800 rounded-lg border-2 border-gray-100 dark:border-gray-700"
                    >
                        <LuChevronRight size={15} className={`${isOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
                    </button>
                </div>


                <nav className={`flex ${isOpen ? 'items-start' : 'items-center'} flex-col justify-start flex-1 py-4 px-2 space-y-3`}>
                    {menuItems.map((item) => (
                        <a
                            key={item.label}
                            onClick={() => setActiveMenu(item.label)}
                            className={`flex space-x-2 p-2 items-start rounded-lg border-2 ${isOpen ? 'justify-start' : 'justify-center'} ${activeMenu === item.label ? 'bg-blue-500 border-blue-500 text-white' : ' bg-gray-50/50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'} ${activeMenu === item.label ? 'hover:bg-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-all duration-300 ${isOpen ? 'w-full' : ''}`}
                        >
                            <item.icon size={15} />
                            {isOpen ? <span className="text-xs font-medium">{item.label}</span> : null}
                        </a>
                    ))}
                </nav>

                <nav className={`flex ${isOpen ? 'items-start' : 'items-center'} flex-col justify-end flex-1 py-4 px-2 space-y-3`}>
                    <a
                        onClick={() => setActiveMenu('Settings')}
                        className={`flex space-x-2 p-2 items-start rounded-lg border-2 ${isOpen ? 'justify-start' : 'justify-center'} ${activeMenu === 'Settings' ? 'bg-black dark:bg-gray-700 border-gray-600 dark:border-gray-500 text-white' : '  border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800'} ${activeMenu === "Settings" ? 'hover:bg-mblack dark:hover:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-all duration-300 ${isOpen ? 'w-full' : ''}`}
                    >
                        <LuSettings size={15} />
                        {isOpen ? <span className="text-xs font-medium">Settings</span> : null}
                    </a>
                </nav>
            </div>

            <div className="flex-1 overflow-auto h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-sm">
                <MainContent selectedMenu={activeMenu} />
            </div>
        </div>
    );
}