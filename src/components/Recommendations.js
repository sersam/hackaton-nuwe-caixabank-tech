import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Box } from '@mui/material';
import RecommendationCard from './RecommendationCard';

function Recommendations() {
    const transactions = useStore(transactionsStore);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate data loading and handle possible errors
        setLoading(true);
        setTimeout(() => {
            // Uncomment the next line to simulate an error
            // setError("Failed to load transactions");
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        // Show a loading indicator while data is being fetched
        return <CircularProgress />;
    }

    if (error) {
        // Display an error message if something goes wrong
        return <Typography color="error">{error}</Typography>;
    }

    // Implement logic to compare expenses between months
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const expenses = transactions.filter(transaction =>
        transaction.type === 'expense' &&
        new Date(transaction.date).getMonth() === currentMonth &&
        new Date(transaction.date).getFullYear() === currentYear
    );

    const expenseThisMonth = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    // For last month's expenses
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const lastMonthExpenses = transactions.filter(transaction =>
        transaction.type === 'expense' &&
        new Date(transaction.date).getMonth() === lastMonth &&
        new Date(transaction.date).getFullYear() === lastMonthYear
    );

    const expenseLastMonth = lastMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);

    // Generate a message based on the comparison between months
    const generateMessage = () => {
        if (expenseLastMonth === 0) {
            return { title: "Keep Going!", message: "Great job! Keep recording your expenses to see trends." };
        } else if (expenseThisMonth > expenseLastMonth) {
            const increase = ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100;
            return { title: "Expense Alert", message: `Your expenses have increased by ${increase.toFixed(2)}%. Consider reviewing your spending.` };
        } else if (expenseThisMonth < expenseLastMonth) {
            const decrease = ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100;
            return { title: "Great Job!", message: `Congratulations! Your expenses have decreased by ${decrease.toFixed(2)}%. Keep it up!` };
        } else {
            return { title: "No Change", message: "Your spending hasn't changed compared to last month." };
        }
    };

    const { title, message } = generateMessage();
    
    return (
        <Box sx={{ mt: 4 }}>
            <RecommendationCard title={title} message={message} />
        </Box>
    );
}

export default Recommendations;
