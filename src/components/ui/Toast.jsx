import { HiMiniBellAlert } from "react-icons/hi2";
import { toastColors } from '../../constant/constants';

// Toast component to display notifications
// setimeout to remove the toast after a certain duration


function Toast() {

    return (
        <div className="max-w-sm w-fit mx-auto">
            <div className={`flex flex-wrap items-center justify-center bg-${toastColors.success}-100 rounded-lg p-4 my-4 text-sm text-${toastColors.success}-700 `} role="alert">
                <HiMiniBellAlert className={`w-5 h-5 inline mr-3 animate-wiggle`} />
                <span className="font-medium"> Action Text.</span>
            </div>
        </div>
    )
}

export default Toast