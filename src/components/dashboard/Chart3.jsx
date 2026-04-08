import React, { useMemo } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import useMembers from '../../Hooks/Team/useMembers';

const Chart3 = () => {
    const { data: members = [] } = useMembers();

    // 1. Memoize counts to optimize performance
    const counts = useMemo(() => {
        const active = members.length;
        return {
            total: members.length,
            active: active,
            percentage: members.length > 0 ? (active / members.length) * 100 : 0,
        };
    }, [members]);

    const chartData = [
        {
            name: 'Active Staff',
            value: counts.active,
            fill: '#6d83c4', // The active progress color
        }
    ];

    return (
        <div className="w-75 h-55 border border-[#e5e7eb] dark:border-gray-700 rounded-2xl p-3.75 bg-white dark:bg-gray-800">

            {/* Minimal Title/Header */}
            <div className="mb-2.5 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-[#374151] dark:text-white">Staff Status</h3>
                <span className="text-xs text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full font-medium">
                    {counts.percentage.toFixed(0)}% Active
                </span>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '160px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {/* Switch PieChart for RadialBarChart */}
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="75%"
                        outerRadius="100%"
                        barSize={12} // Thickness of the track
                        data={chartData}
                        startAngle={90} // Progress bar starts at 12 o'clock
                        endAngle={-270} // and goes clockwise a full 360 degrees
                    >
                        {/* Define the 'track' (The light gray inactive background) */}
                        <PolarAngleAxis
                            type="number"
                            domain={[0, counts.total]} // Total count is 100% of the circle
                            angleAxisId={0}
                            tick={false}
                        />

                        {/* Define the progress (Active count overlay) */}
                        <RadialBar
                            minAngle={15}
                            background={{ fill: '#e5e7eb' }} // Standard slate-200 for 'inactive/empty' track
                            clockWise
                            dataKey="value"
                            cornerRadius={10} // Perfectly rounded ends
                        />

                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Central Labels, positioned precisely inside the RadialBar */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    fontFamily: 'sans-serif'
                }}>
                    {/* Focus on the active number */}
                    <div className='text-[36px] font-bold text-[#1f2637] dark:text-white leading-10'>
                        {counts.active}
                    </div>
                    {/* Total as a subtitle label */}
                    <div className='text-xs text-[#9ca3af] dark:text-gray-300 uppercase mt-1'>
                        OF {counts.total} TOTAL
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart3;