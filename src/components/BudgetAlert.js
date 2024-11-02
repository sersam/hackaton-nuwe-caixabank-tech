// src/components/BudgetAlert.js
import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { resetBudgetAlert, updateBudgetAlert } from '../stores/budgetAlertStore';

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const alertMessage = "Budget exceeded";

    const totalExpense = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)

    // Determine if the budget has been exceeded
    const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

    // Use the useEffect hook to update the budgetAlertStore when the budget is exceeded
    useEffect(() => {
        if (budgetExceeded) {
            updateBudgetAlert('Budget exceeded');
        } else {
            resetBudgetAlert();
        }

    }, [budgetExceeded, userSettings.totalBudgetLimit]);

    return (
        budgetExceeded && <Alert severity='warning'>{alertMessage}</Alert>
    );
};

export default BudgetAlert;
