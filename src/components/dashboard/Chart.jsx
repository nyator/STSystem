import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';

const Chart = () => {
  const { data: tickets = [] } = useTickets();

  const ticketChart = [
    { name: "Open", value: tickets.filter(t => t.status?.toLowerCase() === 'open').length, color: "#fb2c36" },
    { name: "In-Progress", value: tickets.filter(t => t.status?.toLowerCase() === 'in-progress').length, color: "#f0b100" },
    { name: "Resolved", value: tickets.filter(t => t.status?.toLowerCase() === 'resolved').length, color: "#10b981" },
    { name: "Total", value: tickets.length, color: "#2b7fff" },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '450px', height: '250px', padding: '20px', borderRadius: '12px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ticketChart}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          barGap={4}
        >
          {/* Soft horizontal lines only */}
          <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
          
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            domain={[0, 'auto']}
          />

          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '10px'
            }}
          />

          <Bar
            dataKey="value"
            radius={[10, 10, 10, 10]}
            barSize={40}
            background={{ fill: "#e2e8f0", radius: 10 }}
          >
            {/* Assigning unique colors to each bar */}
            {ticketChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;