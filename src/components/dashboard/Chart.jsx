import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';
import { useMemo } from 'react';

const Chart = () => {
  const { data: tickets = [] } = useTickets();

  const chartData = useMemo(() => {

    const openCount = tickets.filter(t => t.status?.toLowerCase() === 'open').length;
    const inProgressCount = tickets.filter(t => t.status?.toLowerCase() === 'in-progress').length;
    const resolvedCount = tickets.filter(t => t.status?.toLowerCase() === 'resolved').length;
    const closedCount = tickets.filter(t => t.status?.toLowerCase() === 'closed').length;
    const reopenCount = tickets.filter(t => t.status?.toLowerCase() === 'reopened').length;
    const totalCount = tickets.length;
    
    return [
      { name: "Open", value: openCount, color: "#e11d48" },
      { name: "Progress", value: inProgressCount, color: "#d97706" },
      { name: "Resolved", value: resolvedCount, color: "#059669" },
      { name: "Closed", value: closedCount, color: "#64748b" },
      { name: "Reopened", value: reopenCount, color: "#ea580c" },
      { name: "Total", value: totalCount, color: "#2563eb" },
    ]
  }, [tickets]);

  return (
    <div className="h-64 w-full p-3">
      <ResponsiveContainer width="90%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          barGap={4}
        >
          {/* Soft horizontal lines only */}
          <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            dy={5}
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
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '10px'
            }}
          />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            barSize={34}
            background={{ fill: "#f1f5f9", radius: 6 }}
          >
            {/* Assigning unique colors to each bar */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
