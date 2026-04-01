import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useMembers from '../../Hooks/Team/useMembers';

const Chart3 = () => {
    const { data: members = [] } = useMembers();

    // UseMemo prevents recalculating filters unless 'members' changes
    const chartData = useMemo(() => {
        const activeCount = members.filter(t => t.status?.toLowerCase() === 'active').length;
        const inactiveCount = members.filter(t => t.status?.toLowerCase() === 'inactive').length;

        return [
            { name: "Active", value: activeCount, color: "#6d83c4" },
            { name: "Inactive", value: inactiveCount, color: "#cbd5e1" },
        ];
    }, [members]);

    const totalMembers = members.length;

    return (
        <div style={{ width: '100%', height: '220px', padding: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="80%" // Move the center down to make it a semi-circle
                        startAngle={180}
                        endAngle={0}
                        innerRadius={78}
                        outerRadius={110}
                        paddingAngle={0}
                        cornerRadius={8} // Rounds the edges of the bars
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>

                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
{/* 
                    <Legend
                        verticalAlign="top"
                        align="right"
                        layout="vertical"
                        iconType="circle"
                        wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }}
                    /> */}
                </PieChart>
            </ResponsiveContainer>

            <div style={{
                marginTop: '-85px',
                // paddingRight: '0px',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', lineHeight: '1' }}>
                    {totalMembers}
                </div>
                <div style={{ fontSize: '11px', fontWeight: "500", color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Total Staff
                </div>
            </div>
        </div>
    );
};

export default Chart3;