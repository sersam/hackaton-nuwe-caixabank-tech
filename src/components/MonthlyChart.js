import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MonthlyChart({ data, xKey, yKeys, colors }) {
    const dataMap = {}; // Implement logic to group transactions by month and calculate totals

    data.forEach((t) => {
        const date = new Date(t.date);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!dataMap[month]) {
            dataMap[month] = { month, income: 0, expense: 0 };
        }

        if (t.type === 'income') {
            dataMap[month].income += t.amount;
        } else if (t.type === 'expense') {
            dataMap[month].expense += t.amount;
        }
    });

    const chartData = Object.values(dataMap).sort((a, b) => new Date(a.month) - new Date(b.month));


    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {yKeys.map((key, index) => (
                    <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} name={key.charAt(0).toUpperCase() + key.slice(1)} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MonthlyChart;
