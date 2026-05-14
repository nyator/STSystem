export const variants = {
    success: "bg-green-100 text-green-700 border-green-200",
    error: "bg-red-100 text-red-700 border-red-200",
}
export const optionBaseClasses = "bg-white dark:bg-gray-800 mb-2 px-3 py-2 text-gray-800 dark:text-gray-100 font-medium rounded-md border border-gray-200 dark:border-gray-700 items-center flex justify-center text-xs transition-all ease-in-out duration-200 active:scale-[0.98]";
export const baseClasses = "group border gap-1.5 text-nowrap px-3 py-2 h-9 rounded-md font-medium text-xs transition-all ease-in-out duration-200 flex items-center justify-center active:scale-[0.98]";
export const variantClasses = {
    default: "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow-sm shadow-gray-200/40 dark:shadow-none",
    primary: "bg-[#2563eb] text-white hover:bg-[#1d4ed8] border-[#2563eb] shadow-sm shadow-blue-200/60 dark:shadow-none",
    secondary: "bg-gray-700 text-white hover:bg-gray-800 border-gray-700",
    disabled: "bg-gray-100 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none",
    danger: "bg-red-600 text-white hover:bg-red-700 border-red-600",
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


export const USER_ROLES = {
    CLIENT: "client",
    ADMIN: "admin",
    ASSIGNEE: "assignee",
};
