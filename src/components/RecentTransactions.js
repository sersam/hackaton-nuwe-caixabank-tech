import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import TransactionItem from './TransactionItem';

function RecentTransactions({ transactions }) {

    // Recent transactions
    const recentTransactions = transactions.sort((transactionA, transactionB) => new Date(transactionA.date) - new Date(transactionB.date)).slice(0, 5); // Implement logic to get the last 5 transactions

    return (
        <div>
            <h3>Recent Transactions</h3>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentTransactions.map((transaction) =>
                            <TransactionItem key={transaction.id} transaction={transaction} />

                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RecentTransactions;
