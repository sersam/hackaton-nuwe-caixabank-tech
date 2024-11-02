import React, { useState, useEffect } from 'react';
import { addTransaction, deleteTransaction } from '../stores/transactionStore';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box } from '@mui/material';
import { categoryKeywords } from '../constants/categoryKeywords';
import { allCategories } from '../constants/categories';
import CustomTextField from './CustomTextField';
import CustomSelect from './CustomSelectField';

const TransactionForm = React.memo(({ open, transactionToEdit, onClose }) => {
    // Local state variables
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Implement the function to assign a category based on description keywords
    const assignCategory = (desc) => {
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            const containsKeyword = keywords.some(keyword => desc.includes(keyword));
            if (containsKeyword) {
                return category;
            }
        }
        return 'Other Expenses';
    };

    // Auto-assign a category if adding a new transaction
    useEffect(() => {
        if (!transactionToEdit) {
            const newCategory = assignCategory(description);
            setCategory(newCategory);
        } else {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(transactionToEdit.date);
        }

        // Instructions: Add the proper dependencies to the useEffect hook
    }, [transactionToEdit, description]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields
        if (!description.trim() || !amount || !category) {
            return;
        }

        const transaction = {
            id: transactionToEdit ? transactionToEdit.id : Date.now(),
            description,
            amount: parseFloat(amount),
            type,
            category,
            date,
        };

        if (transactionToEdit) {
            // Update existing transaction
            deleteTransaction(transactionToEdit.id);
            addTransaction(transaction)
        } else {
            // Add new transaction
            addTransaction(transaction)
        }

        onClose?.();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomTextField label={"Description"} value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                label="Amount (€)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                inputProps={{ min: 0, step: '0.01' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomSelect
                                label="Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                options={[
                                    { value: 'income', label: 'Income' },
                                    { value: 'expense', label: 'Expense' },
                                ]}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomSelect
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={allCategories.map(cat => ({ value: cat, label: cat }))}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" data-testid="add-transaction-button">
                            {transactionToEdit ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
});

export default TransactionForm;