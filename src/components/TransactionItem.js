import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const TransactionItem = ({ transaction }) => (
    <TableRow key={transaction.id}>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
        <TableCell>{transaction.type}</TableCell>
        <TableCell>{transaction.category}</TableCell>
        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
    </TableRow>
);

export default TransactionItem;
