import { useEffect } from 'react';
import { HiMiniBellAlert } from "react-icons/hi2";
import { variants } from '../../constant/constants';

function Toast({ message, duration = 3000, type = "success", onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <div className="max-w-sm w-fit mx-auto absolute top-3 left-1/3 z-[2000] transition-all duration-300 ease-in-out">
            <div
                className={`flex items-center border rounded-lg p-4 text-sm ${variants[type] || variants.success}`}
                role="alert"
            >
                <HiMiniBellAlert className="w-5 h-5 inline mr-3 animate-wiggle" />
                <span className="font-medium">{message}</span>
            </div>
        </div>
    )
}

export default Toast