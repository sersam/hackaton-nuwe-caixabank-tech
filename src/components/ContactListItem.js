// ContactListItem.js
import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Button, Typography } from '@mui/material';

const ContactListItem = ({ user }) => {
    const { id, name, email, phone, company } = user;

    const handleContactClick = () => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <ListItem key={id} sx={{ margin: '6px 0' }}>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={<Typography>{`${name} - ${email}`}</Typography>}
                secondary={
                    <Typography variant='body2' sx={{ color: "rgb(119,119,119)" }}>
                        {`Phone: ${phone} | Company: ${company.name}`}
                    </Typography>
                }
            />
            <Button onClick={handleContactClick} color="primary" variant='contained'>Contact</Button>
        </ListItem>
    );
};

export default ContactListItem;
