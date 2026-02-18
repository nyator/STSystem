import { statusColors } from '../../constant/constants'

function StatusBadge() {
    return (
        <div className={`max-w-sm w-fit bg-${statusColors.open}-100 text-${statusColors.open}-700 rounded-md py-1 px-5 mx-auto font-medium text-xs cursor-pointer`}>
            Badge
        </div>
    )
}

export default StatusBadge