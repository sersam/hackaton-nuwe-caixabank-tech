import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { login } from '../stores/authStore';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
            setError("Please fill all the fields");
            return;
        }


        // Check if the passwords match.
        // - If the passwords do not match, set an appropriate error message.

        if (password.trim() !== confirmPassword.trim()) {
            setError("Passwords are not matching")
            return;
        }

        // Check if the email is already registered in localStorage.
        // - Retrieve the existing user from localStorage and verify if the entered email already exists.
        // - If the email exists, set an error message.

        const userData = localStorage.getItem("user");

        if (userData != null && userData.email === email.trim()) {
            setError("Email already registered");
            return;
        }


        // Save the new user's data to localStorage.
        // - If validation passes, store the new user's email and password in localStorage.

        setError('');

        // Automatically log the user in after successful registration.
        // - Call the `login` function to set the authenticated user in the store.
        login({ email, password })

        // Redirect the user to the dashboard.
        // - After successful registration and login, redirect the user to the home/dashboard page.

        setSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Account created successfully! Redirecting to login...
                </Alert>
            )}


            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </Box>
        </Box>
    );
}

export default RegisterPage;
