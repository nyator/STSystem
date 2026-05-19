import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';

const PRIORITY_META = [
    { key: 'high', name: 'High', color: '#dc2626' },
    { key: 'medium', name: 'Medium', color: '#d97706' },
    { key: 'low', name: 'Low', color: '#2563eb' },
];

const Chart2 = () => {
    const { data: tickets = [] } = useTickets();

    const totalTickets = tickets.length;
    const data = PRIORITY_META
        .map((priority) => ({
            ...priority,
            value: tickets.filter((ticket) => (ticket.priority || 'low').toLowerCase() === priority.key).length,
        }))
        .filter((priority) => priority.value > 0);
    const chartData = totalTickets > 0 ? data : [{ name: 'No tickets', value: 1, color: '#e5e7eb' }];
    const highPriorityCount = tickets.filter((ticket) => ticket.priority?.toLowerCase() === 'high').length;
    const paddingAngle = chartData.length > 1 ? 5 : 0;

    return (
        <div className="flex h-64 w-full flex-col p-3">
            <div className="mb-2 flex items-center justify-around gap-2 text-sm">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white">Priority Mix</h3>
                <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-300">
                    {highPriorityCount} High
                </span>
            </div>

            <div className="relative h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={48}
                            outerRadius={72}
                            paddingAngle={paddingAngle}
                            dataKey="value"
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>

                        {/* <Tooltip
                            formatter={(value, name) => [
                                totalTickets === 0 ? '0' : `${value} tickets`,
                                name,
                            ]}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 8px 20px rgba(15,23,42,0.08)' }}
                        /> */}
                    </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="block text-xs text-gray-500">Total</span>
                    <span className="text-2xl font-semibold text-gray-950 dark:text-white">{totalTickets}</span>
                </div>
            </div>

            <div className="mt-1  gap-x-2 px-2 text-[11px] font-medium leading-4 text-gray-500 dark:text-gray-400 flex justify-around w-2/3 mx-auto">
                {chartData.map((priority) => (
                    <div key={priority.name} className="flex w-fit min-w-0 items-center gap-1.5">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: priority.color }} />
                        <span className="truncate">{priority.name}</span>
                        {/* <span className="ml-auto text-gray-400">{totalTickets === 0 ? 0 : priority.value}</span> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chart2;
