import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../stores/authStore';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import ForgotPasswordPage from './ForgotPasswordPage';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate that fields are not empty
        if (!email || !password) {
            // - If either is empty, set an appropriate error message.
            setError("Email or password are not filled");
            return;
        }

        // Validate credentials
        const userData = localStorage.getItem("user");
        if ((userData && userData.email === email.trim() && userData.password === password.trim()) || (email.trim() === defaultCredentials.email && password.trim() === defaultCredentials.password)) {
            login({ email, password });
            navigate("/");
        } else {
            setError('Credentials are not correct');
        }

    };

    const handleShowDefaultCredentials = () => {
        // Show default credentials in case the user requests it
        setEmail(defaultCredentials.email);
        setPassword(defaultCredentials.password);
        setShowCredentials(true);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            {forgotPassword ?
                <ForgotPasswordPage />
                :
                <>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            Login
                        </Button>
                    </form>
                </>}

            {/* Show error message when applicable */}
            {/* - Use the Alert component to display the error message if one exists. */}
            {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button onClick={() => {
                    setForgotPassword(!forgotPassword);
                    setError("");
                    setShowCredentials(false);
                }}>{!forgotPassword ? "Forgot Password?" : "Login"}</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
                {!forgotPassword && <Button onClick={() => handleShowDefaultCredentials()}>Show default credentials</Button>}
            </Box>

            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Email:</strong> {defaultCredentials.email}<br />
                    <strong>Password:</strong> {defaultCredentials.password}
                </Alert>
            )}
        </Box>
    );
}

export default LoginPage;
