import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import useMembers from '../../Hooks/Team/useMembers';
import useTickets from '../../Hooks/Tickets/useTickets';

const Chart3 = () => {
    const { data: members = [] } = useMembers();
    const { data: tickets = [] } = useTickets();

    const stats = useMemo(() => {
        const assignedMemberIds = new Set(
            tickets.filter((ticket) => ticket.assignedTo).map((ticket) => ticket.assignedTo),
        );
        const active = members.filter((member) => assignedMemberIds.has(member.id)).length;
        const available = Math.max(0, members.length - active);

        return {
            active,
            available,
            total: members.length,
            activePercent: members.length ? Math.round((active / members.length) * 100) : 0,
        };
    }, [members, tickets]);

    const chartData = useMemo(() => {
        if (stats.total === 0) {
            return [{ name: 'No Staff', value: 1, color: '#e5e7eb' }];
        }

        return [
            { name: 'Active Staff', value: stats.active, color: '#4f46e5' },
            { name: 'Available Staff', value: stats.available, color: '#65a30d' },
        ];
    }, [stats]);

    const tooltipFormatter = (value, name) => {
        if (stats.total === 0) return ['0', name];
        return [value, name];
    };

    return (
        <div className="h-64 w-full px-3">
            <div className="flex items-center justify-around gap-2 text-sm">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white">Staff Capacity</h3>
                <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                    {stats.activePercent}% Active
                </span>
            </div>

            <div className="relative h-49">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={58}
                            outerRadius={86}
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={tooltipFormatter}
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 8px 20px rgba(15,23,42,0.08)',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-2xl font-semibold text-gray-950 dark:text-white">{stats.total}</span>
                    <span className="block text-xs text-gray-500">Members</span>
                </div>
            </div>

            <div className="mt-1 flex justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>Active {stats.active}</span>
                <span>Available {stats.available}</span>
            </div>
        </div>
    );
};

export default Chart3;
