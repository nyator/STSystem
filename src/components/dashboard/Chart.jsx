import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';
import { useMemo } from 'react';

const Chart = () => {
  const { data: tickets = [] } = useTickets();

  const chartData = useMemo(() => {

    const openCount = tickets.filter(t => t.status?.toLowerCase() === 'open').length;
    const allOpenedCount = tickets.filter(t =>
      t.status?.toLowerCase() === 'open' || t.status?.toLowerCase() === 'reopened'
    ).length;
    const reopenCount = tickets.filter(t => t.status?.toLowerCase() === 'reopened').length;
    const inProgressCount = tickets.filter(t => t.status?.toLowerCase() === 'in-progress').length;
    const resolvedCount = tickets.filter(t => t.status?.toLowerCase() === 'resolved').length;
    const closedCount = tickets.filter(t => t.status?.toLowerCase() === 'closed').length;
    const totalCount = tickets.length;

    return [
      { name: "All Opened", value: openCount, color: "#fb2c36" },
      // { name: "reopened", value: reopenCount, color: "#ff6900" },
      { name: "In-Progress", value: inProgressCount, color: "#f0b100" },
      { name: "Resolved", value: resolvedCount, color: "#10b981" },
      { name: "closed", value: closedCount, color: "#c7c7c7 " },
      { name: "reopened", value: reopenCount, color: "#ff6900" },
      { name: "Total", value: totalCount, color: "#2b7fff" },
    ]
  }, [tickets]);

  return (
    <div style={{ width: '100%', height: '220px', padding: '10px' }}>
      <ResponsiveContainer width={350} height={250}>
        <BarChart
          data={chartData}
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
