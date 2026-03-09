import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';
import useTickets from '../../Hooks/Tickets/useTickets';

const Chart = () => {
    const { data: tickets = [] } = useTickets()

    const ticketChart = [
        { name: "Progress Tickets", value: tickets.filter(t => (t.status || '').toLowerCase() === 'in-progress').length },
        { name: "Opened Tickets", value: tickets.filter(t => (t.status || '').toLowerCase() === 'open').length },
        { name: "Resolved Tickets", value: tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length },
        { name: "Total Tickets", value: tickets.length },
    ]

    return (
        <BarChart
            style={{ width: '100%', maxWidth: '410px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={ticketChart}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="9 9" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Bar type="monotone" dataKey="value" stackId="1" stroke="#2b7fff " fill="#155dfc" />
        </BarChart>
    );
};

export default Chart;