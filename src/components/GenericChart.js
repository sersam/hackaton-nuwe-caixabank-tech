import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const GenericLineChart = React.memo(({ data, xAxisKey, yAxisKey, lineColor }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={yAxisKey} stroke={lineColor} />
            </LineChart>
        </ResponsiveContainer>
    );
});

export default GenericLineChart;
