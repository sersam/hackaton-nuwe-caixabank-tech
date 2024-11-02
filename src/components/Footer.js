import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import { Search, Facebook, Twitter, Instagram } from '@mui/icons-material';
import footerImage from '../assets/bgmaps.png'


const Footer = () => {
    return (
        <Box component="footer" sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", padding: "32px", width: "100%", backgroundImage: `url(${footerImage})`}}>
            {/* Search bar */}
            <Box sx={{ marginBottom: '24px' }}>
                <Paper component="form">
                    <IconButton aria-label="search">
                        <Search />
                    </IconButton>
                    <InputBase placeholder="Find your branch..." />
                    <Button type="submit">Search</Button>
                </Paper>
            </Box>

            <Typography>
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            {/* Social media icons */}
            <Box sx={{ marginTop: "16px" }}>
                <IconButton aria-label="facebook-icon" href={"https://www.facebook.com/"}>
                    <Facebook />
                </IconButton>
                <IconButton aria-label="twitter-icon" href={"https://www.twitter.com/"}>
                    <Twitter />
                </IconButton>
                <IconButton aria-label="instagram-icon" href={"https://www.instagram.com/"}>
                    <Instagram />
                </IconButton>

            </Box>
        </Box>
    );
};

export default Footer;
