import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';

const Chart2 = () => {
    const { data: tickets = [] } = useTickets();

    const data = [
        { name: "In-Progress", value: tickets.filter(t => t.status?.toLowerCase() === 'in-progress').length, color: "#d97706" },
        { name: "Open", value: tickets.filter(t => t.status?.toLowerCase() === 'open').length, color: "#e11d48" },
        { name: "Resolved", value: tickets.filter(t => t.status?.toLowerCase() === 'resolved').length, color: "#059669" },
    ];

    const totalTickets = tickets.length;

    return (
        <div className="relative h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={98}
                        paddingAngle={5}   // Gaps between segments
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 8px 20px rgba(15,23,42,0.08)' }}
                    />

                    {/* <Legend verticalAlign="bottom" height={36} iconType="circle" /> */}
                </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="block text-xs text-gray-500">Total</span>
                <span className="text-2xl font-semibold text-gray-950 dark:text-white">{totalTickets}</span>
            </div>
        </div>
    );
};

export default Chart2;
