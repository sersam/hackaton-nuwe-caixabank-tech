import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import StatisticsDisplay from './StatisticsDisplay';

function Statistics() {
    const transactions = useStore(transactionsStore);
    console.log(transactions);

    // Filter transactions by 'expense' type
    const expenses = transactions.filter(transaction => transaction.type === 'expense');

    // Calculate total expense
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Get unique dates from expenses
    const uniqueDates = [...new Set(expenses.map(expense => expense.date))];
    const averageDailyExpense = uniqueDates.length > 0 ? (totalExpense / uniqueDates.length) : 0;

    // Find the category with the highest spending
    const categoryExpenses = {};
    expenses.forEach(expense => {
        if (!categoryExpenses[expense.category]) {
            categoryExpenses[expense.category] = 0;
        }
        categoryExpenses[expense.category] += expense.amount;
    });

    let maxCategory = null;
    if (Object.keys(categoryExpenses).length > 0) {
        maxCategory = Object.keys(categoryExpenses).reduce((a, b) =>
            categoryExpenses[a] > categoryExpenses[b] ? a : b
        );
    }

    return (
        <StatisticsDisplay
            totalExpense={totalExpense}
            averageDailyExpense={averageDailyExpense}
            maxCategory={maxCategory}
            categoryExpenses={categoryExpenses}
        />
    );
}

export default Statistics;
