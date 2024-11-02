import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const generateDataGraph = (transactions, categories) => {
    return categories.map(category => {
        const income = transactions
            .filter(transaction => transaction.category === category && transaction.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const expense = transactions
            .filter(transaction => transaction.category === category && transaction.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);

        return { category, Income: income, Expense: expense };
    })
}

function AnalysisGraph() {
    const transactions = useStore(transactionsStore);

    // Unique categories
    const categories = [...new Set(transactions.map(transaction => transaction.category))];

    // Chart data
    const data = generateDataGraph(transactions, categories);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default AnalysisGraph;
