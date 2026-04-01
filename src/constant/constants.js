export const variants = {
    success: "bg-green-100 text-green-700 border-green-200",
    error: "bg-red-100 text-red-700 border-red-200",
}
export const optionBaseClasses = "bg-gray-100 dark:bg-gray-700 mb-2 p-2 text-mblack dark:text-gray-200 font-medium rounded-lg items-center flex items-center justify-center text-xs transition-all ease-in-out duration-300";
export const baseClasses = "group border-2 gap-1 text-nowrap p-2 rounded-lg font-medium text-xs transition-all ease-in-out duration-300 flex items-center justify-between";
export const variantClasses = {
    default: "bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-50 dark:hover:border-gray-600 border-gray-100 dark:border-gray-600 text-mblack dark:text-gray-200",
    primary: "bg-blue-500 text-white hover:bg-blue-600 border-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 border-gray-500",
    disabled: "bg-gray-50 dark:bg-gray-800  border-gray-50 dark:border-gray-700 text-mblack/40 dark:text-gray-600 cursor-not-allowed",
    danger: "bg-red-500 text-white hover:bg-red-600 border-red-500",
};

// Filter and Sort Options
export const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
];

export const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
];

export const dateOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
];

export const sortOptions = [
    { value: 'createdAt', label: 'Created At' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'title', label: 'Title' },
];

export const sortGroups = [
    {
        title: 'Sort By',
        filterType: 'sortKey',
        options: sortOptions
    },
    {
        title: 'Direction',
        filterType: 'sortDirection',
        options: [
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' }
        ]
    }
];

export const filterGroups = [
    {
        title: 'Status',
        filterType: 'status',
        options: statusOptions
    },
    {
        title: 'Priority',
        filterType: 'priority',
        options: priorityOptions
    },
    {
        title: 'Date',
        filterType: 'date',
        options: dateOptions
    }
];
