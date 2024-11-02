import React, { useState, useEffect, Profiler, Suspense } from 'react';
import { Box, Typography, CircularProgress, Paper, List, TextField, Alert } from '@mui/material';
import { onRenderCallback } from '../utils/onRenderCallback';
import ContactListItem from './ContactListItem';

function SupportPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Implement the effect to get user data from the API
    useEffect(() => {
        // Request implementation and error handling
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users")
                if (response.ok) {
                    const users = await response.json();
                    setUsers(users);
                } else {
                    setError("Error fetching data")
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    // Filter users by search term
    const filteredUsers = users.filter((user) => user.name.includes(searchTerm));

    const handleSearchChange = (event) => {
        // Update search term
        setSearchTerm(event.target.value)
    };

    // Display loading spinner
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        // Display error message
        return <Alert severity='error'>{error}</Alert>
    }

    return (
        <Profiler id="SupportPage" onRender={onRenderCallback}>
            <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
                <Typography variant="h4" gutterBottom color="primary">
                    Support Contacts
                </Typography>

                {/* Here is the search bar */}
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 4 }}
                />

                {/* Implement the support contact list */}
                <Suspense fallback={<CircularProgress />}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <List>
                            {/* Here are the filtered users */}
                            {filteredUsers.map((filteredUser) =>
                                <ContactListItem key={filteredUser.id} user={filteredUser} />
                            )}
                        </List>
                    </Paper>
                </Suspense>
            </Box>
        </Profiler>
    );
}

export default SupportPage;