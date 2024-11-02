import React, { useState, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ExportButton from './ExportButton';
import { userSettingsStore } from '../stores/userSettingsStore';

function Analysis() {
    const transactions = useStore(transactionsStore);
    const userSettings = useStore(userSettingsStore);

    const [timeFrame, setTimeFrame] = useState('monthly');
    const [reportType, setReportType] = useState('trend');

    // Helper function to group transactions by timeframe
    const groupTransactionsByTimeframe = (transactions, timeframe) => {
        const groupedTransactions = {};
        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            let key;
            switch (timeframe) {
                case 'daily':
                    key = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                    break;
                case 'weekly':
                    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay())); // Get first day of the week
                    key = startOfWeek.toISOString().split('T')[0];
                    break;
                case 'monthly':
                    key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as YYYY-MM
                    break;
                case 'yearly':
                    key = `${date.getFullYear()}`; // Format as YYYY
                    break;
                default:
                    key = date.toISOString().split('T')[0];
            }
            if (!groupedTransactions[key]) {
                groupedTransactions[key] = [];
            }
            groupedTransactions[key].push(transaction);
        });
        return groupedTransactions;
    };

    // Prepare the data for the trend analysis report based on the selected time frame.
    const trendData = useMemo(() => {
        const groupedTransactions = groupTransactionsByTimeframe(transactions, timeFrame);
        return Object.keys(groupedTransactions).map(key => ({
            key,
            income: groupedTransactions[key].filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
            expense: groupedTransactions[key].filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
        }));
    }, [transactions, timeFrame]);


    // Prepare the data for the budget vs actual report.
    const budgetData = useMemo(() => {
        // Replace with logic to compare the actual expenses against the budget.
        const budget = userSettings.totalBudgetLimit; // Example budget value
        const actualExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return [{
            key: 'Budget vs Actual',
            budget,
            actual: actualExpenses,
        }];
    }, [transactions, userSettings.totalBudgetLimit]);


    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Advanced Analysis
            </Typography>

            {/* Display No Transactions Message */}
            {transactions.length === 0 && (
                <Typography variant="h6" color="text.secondary">
                    No transactions available.
                </Typography>
            )}

            {/* Controls */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
                        <Select
                            labelId="timeframe-select-label"
                            id="timeframe-select"
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="report-type-select-label">Report Type</InputLabel>
                        <Select
                            labelId="report-type-select-label"
                            id="report-type-select"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <MenuItem value="trend">Trend Analysis</MenuItem>
                            <MenuItem value="budget">Budget vs. Actual</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Export Button */}
                <Grid item xs={12} sm={6} md={4}>
                    <ExportButton
                        data={reportType === 'trend' ? trendData : budgetData}
                        filename={`${reportType}-report.csv`}
                        headers={reportType === 'trend' ? ['Date', 'Income', 'Expense'] : ['Category', 'Budget', 'Actual']}
                    />
                </Grid>
            </Grid>

            {/* Render the trend analysis chart if 'trend' is selected */}
            {reportType === 'trend' && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Income and Expenses Trend
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={trendData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#28B463" name="Income" />
                                    <Line type="monotone" dataKey="expense" stroke="#E74C3C" name="Expenses" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Render the budget vs actual expenses chart if 'budget' is selected */}
            {reportType === 'budget' && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Budget vs Actual Expenses
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={budgetData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#82ca9d" />
                                    <Bar dataKey="actual" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Additional Analysis Sections */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Savings Goals
                        </Typography>
                        <Typography>No savings goals set.</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Net Worth Over Time
                        </Typography>
                        <Typography>No net worth data available.</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Analysis;
