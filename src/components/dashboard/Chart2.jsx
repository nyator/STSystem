import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';

const Chart2 = () => {
    const { data: tickets = [] } = useTickets();

    const data = [
        { name: "In-Progress", value: tickets.filter(t => t.status?.toLowerCase() === 'in-progress').length, color: "#f0b100" },
        { name: "Open", value: tickets.filter(t => t.status?.toLowerCase() === 'open').length, color: "#fb2c36" },
        { name: "Resolved", value: tickets.filter(t => t.status?.toLowerCase() === 'resolved').length, color: "#10b981" },
    ];

    const totalTickets = tickets.length;

    return (
        <div style={{ width: '410px', height: '200px', position: 'relative' }}>
            <ResponsiveContainer width={410} height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}  // This creates the "Donut" hole
                        outerRadius={100}
                        paddingAngle={5}   // Gaps between segments
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />

                    {/* <Legend verticalAlign="bottom" height={36} iconType="circle" /> */}
                </PieChart>
            </ResponsiveContainer>

            <div style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Total</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{totalTickets}</span>
            </div>
        </div>
    );
};

export default Chart2;
