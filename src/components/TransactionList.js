import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { deleteTransaction, transactionsStore } from '../stores/transactionStore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
    TablePagination
} from '@mui/material';
import TransactionForm from './TransactionForm';
import TransactionRow from './TransactionRow';

function TransactionList() {
    const transactions = useStore(transactionsStore);

    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [categoryFilters, setCategoryFilters] = useState([]);

    const [openTransactionForm, setOpenTransactionForm] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState();

    // Delete functionality
    const handleDeleteTransaction = useCallback((id) => {
        deleteTransaction(id)
    }, [transactions]);

    // Edit functionality
    const handleEdit = useCallback((transaction) => {
        // Implement functionality to open the edit form with the transaction data
        setTransactionToEdit(transaction);
        setOpenTransactionForm(true);
    }, []);

    const handleCloseTransactionForm = () => {
        setTransactionToEdit(undefined);
        setOpenTransactionForm(false);
    }

    // Filtering and sorting transactions
    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(transaction =>
                (filterCategory ? transaction.category === filterCategory : true) &&
                (filterType ? transaction.type === filterType : true)
            )
            .sort((a, b) => {
                if (sortField === 'amount') return a.amount - b.amount;
                if (sortField === 'date') return new Date(a.date) - new Date(b.date);
                return 0;
            });
    }, [transactions, filterCategory, filterType, sortField]);

    useEffect(() => {
        setCategoryFilters([...new Set(filteredTransactions.map((transaction) => transaction.category))])
    }, [filteredTransactions])

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

            {/* Add transaction */}
            <Button variant="contained" color="primary" onClick={() => setOpenTransactionForm(true)}>
                Add Transaction
            </Button>

            {openTransactionForm && <TransactionForm open={openTransactionForm} onClose={handleCloseTransactionForm} transactionToEdit={transactionToEdit} />}

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {categoryFilters.map((category) => <MenuItem value={category} key={category}>{category}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-type-label">Type</InputLabel>
                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-field-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-field-label"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Table of transactions */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map(transaction => (
                            <TransactionRow transaction={transaction} onEdit={() => handleEdit(transaction)} onDelete={() => handleDeleteTransaction(transaction.id)} />

                            // <TableRow key={transaction.id}>
                            //     <TableCell>{transaction.description}</TableCell>
                            //     <TableCell>{transaction.amount}</TableCell>
                            //     <TableCell>{transaction.type}</TableCell>
                            //     <TableCell>{transaction.category}</TableCell>
                            //     <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            //     <TableCell>
                            //         <Button onClick={() => handleEdit(transaction)} color="primary">Edit</Button>
                            //         <Button onClick={() => handleDeleteTransaction(transaction.id)} color="secondary">Delete</Button>
                            //     </TableCell>
                            // </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTransactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e) => setPage(e?.target.value)}
                onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
            />
        </Box>
    );
}

export default TransactionList;
