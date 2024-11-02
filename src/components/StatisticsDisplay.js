// StatisticsDisplay.js
import React from 'react';
import { Paper, Typography } from '@mui/material';

const StatisticsDisplay = ({ totalExpense, averageDailyExpense, maxCategory, categoryExpenses }) => {
    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Key Statistics</Typography>
            <Typography>
                Total Expense: {totalExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Average Daily Expense: {averageDailyExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category:{' '}
                {maxCategory
                    ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
};

export default StatisticsDisplay;
