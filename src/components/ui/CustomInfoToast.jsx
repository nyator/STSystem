import { toast } from 'react-hot-toast';
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

const CustomInfoToast = () => {
    toast('No changes have been made.', {
        icon: <TbInfoSquareRoundedFilled className='text-2xl text-blue-600' />,
        style: {
            background: '#fff',
            color: '#000',
        },
    });
};

export default CustomInfoToast