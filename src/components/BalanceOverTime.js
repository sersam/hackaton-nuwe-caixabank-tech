import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import GenericLineChart from './GenericChart';

const BalanceOverTime = React.memo(() => {
    const transactions = useStore(transactionsStore);

    const data = transactions
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
        .reduce((acc, transaction) => {
            const lastBalance = acc.length > 0 ? acc[acc.length - 1].Balance : 0;
            const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
            const newBalance = lastBalance + amount;

            // Add new entry to the cumulative balance array
            acc.push({
                date: transaction.date,
                Balance: newBalance,
            });
            return acc;
        }, []);


    return (
        <GenericLineChart
            data={data}
            xAxisKey="date"
            yAxisKey="Balance"
            lineColor="#8884d8"
        />
    );
});

export default BalanceOverTime;
