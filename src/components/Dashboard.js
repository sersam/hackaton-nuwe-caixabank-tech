import React, { Profiler } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function Dashboard() {
    const transactions = useStore(transactionsStore);

    // Calculate total income, total expenses, and balance
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Dashboard
                </Typography>


                {/* Action Buttons Section */}
                <Box sx={{ mb: 4 }}>
                    <ExportButton data={transactions} headers={[]} />
                    <DownloadProfilerData />
                </Box>

                {/* Totals Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Income
                            </Typography>
                            <Typography variant="h5" data-testid="total-income">
                                {totalIncome}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" data-testid="total-expenses">
                                {totalExpense}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Balance
                            </Typography>
                            <Typography variant="h5" data-testid="balance">
                                {balance}
                            </Typography>

                            {balance < 0 && (
                                <Typography color="error">Warning: Your balance is negative!</Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                {/* Statistics and Recommendations Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading Statistics...</div>}>
                            <Statistics />
                        </React.Suspense>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading Recommendations...</div>}>
                            <Recommendations />
                        </React.Suspense>
                    </Grid>
                </Grid>

                {/* Charts Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading Analysis Graph...</div>}>
                            <AnalysisGraph />
                        </React.Suspense>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading Balance Over Time...</div>}>
                            <BalanceOverTime />
                        </React.Suspense>
                    </Grid>
                </Grid>

                {/* Recent Transactions Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <React.Suspense fallback={<div>Loading Recent Transactions...</div>}>
                            <RecentTransactions transactions={transactions} />
                        </React.Suspense>
                    </Grid>
                </Grid>
            </Box>
        </Profiler>
    );
}

export default Dashboard;
