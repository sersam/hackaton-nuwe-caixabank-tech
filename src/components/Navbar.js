import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Typography, Avatar, Tooltip, ToggleButton, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import { authStore, logout } from '../stores/authStore'; // Import auth store for authentication state
import { useStore } from '@nanostores/react'; // Nanostores to track auth
import useMediaQuery from '@mui/material/useMediaQuery';
import { budgetAlertStore } from '../stores/budgetAlertStore';
import NotificationPopup from './NotificationPopup';


const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const budgetAlert = useStore(budgetAlertStore)
    const matches = useMediaQuery('(min-width:768px)');


    const auth = useStore(authStore); // Get authentication status from auth store
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const getNavigationLinks = () =>
        <>
            <Link to={"/"} style={{ color: 'white' }}>Dashboard</Link>
            <Link to={"/transactions"}  style={{ color: 'white' }}>Transactions</Link>
            <Link to={"/analysis"}  style={{ color: 'white' }}>Analysis</Link>
            <Link to={"/settings"}  style={{ color: 'white' }}>Settings</Link>
            <Link to={"/support"}  style={{ color: 'white' }}>Support</Link>
        </>



    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!matches ? <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton> : undefined}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button>
                                <img src={require("../assets/caixabank-icon.png")} alt='CaixaBank logo' style={{ display: "block", width: '40px', height: 'auto' }} />
                            </Button>
                            <Typography variant="h6">CaixaBankNow</Typography>
                        </Box>


                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', width: '100%' }}>
                        {matches ? !auth.isAuthenticated ?
                            <>
                                <Link to={"/login"}  style={{ color: 'white' }}> Login </Link>
                                <Link to={"/register"}  style={{ color: 'white' }}> Register </Link>
                            </> : <Box sx={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                {getNavigationLinks()}
                                <Link to={"/"} style={{ color: 'white' }}  onClick={() => logout()}>Logout</Link>
                            </Box> : undefined}

                        <Switch onChange={toggleTheme} checked={isDarkMode} />

                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            <IconButton onClick={() => budgetAlert.isVisible ? setShowNotifications(true) : undefined}>
                                <Badge color={budgetAlert.isVisible ? 'error' : 'default'} variant="dot">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            <NotificationPopup open={showNotifications} message={budgetAlert.message} onClose={() => setShowNotifications(false)} />

                            {auth.isAuthenticated && <Tooltip title={auth.user.email}>
                                <Avatar alt={auth.user.email}></Avatar>
                            </Tooltip>}

                        </Box>
                    </Box>


                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: '24px', padding: '24px' }}>
                    {/* Drawer navigation links */}
                    {!auth.isAuthenticated ? <>
                        <Button onClick={() => navigate("/login")}> Login </Button>
                        <Button onClick={() => navigate("/register")}> Register </Button>
                    </> :
                        getNavigationLinks()
                    }
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;