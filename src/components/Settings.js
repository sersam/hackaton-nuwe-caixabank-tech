import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { updateBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';
import { transactionsStore } from '../stores/transactionStore';

function Settings() {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const [alertsEnabled, setAlertsEnabled] = useState(userSettings.alertsEnabled || false);
    const [categoryLimits, setCategoryLimits] = useState(userSettings.categoryLimits ?? {});
    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);

    const handleCategoryChange = (category) => (event) => {
        setCategoryLimits({
            ...categoryLimits,
            [category]: parseFloat(event.target.value) || 0,
        });
    };

    const handleSave = () => {
        const totalCategoryLimit = Object.values(categoryLimits).reduce((acc, curr) => acc + curr, 0);

        if (totalCategoryLimit > totalBudgetLimit) {
            setError('Total category limits exceed the total budget limit.');
            return;
        }

        const totalExpenses = transactions.reduce((acc, curr) => acc + (curr.type === 'expense' ? curr.amount : 0), 0);
        if (totalExpenses > totalBudgetLimit) {
            setBudgetExceeded(true);
            updateBudgetAlert(true);
        } else {
            setBudgetExceeded(false);
        }

        // Save settings logic
        userSettingsStore.set({ ...userSettings, totalBudgetLimit, categoryLimits, alertsEnabled });

        setSuccessMessage('Settings saved successfully!');
        setError('');
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Settings
            </Typography>

            <FormControlLabel
                control={<Switch checked={alertsEnabled} onChange={() => setAlertsEnabled(!alertsEnabled)} color="primary" />}
                label="Enable Alerts"
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    name="totalBudgetLimit"
                    fullWidth
                    margin="normal"
                    value={totalBudgetLimit}
                    inputProps={{ min: 0, step: '0.01' }}
                    sx={{ mt: 1 }}
                    onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || 0)}
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {expenseCategories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category}>
                            <TextField
                                label={category}
                                type="number"
                                fullWidth
                                margin="normal"
                                value={categoryLimits[category]}
                                inputProps={{ min: 0, step: '0.01' }}
                                onChange={handleCategoryChange(category)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
