// CustomTextField.js
import React from 'react';
import { TextField } from '@mui/material';


const CustomTextField = ({ label, value, onChange, required = false, type = 'text', ...props }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            required={required}
            type={type}
            fullWidth
            margin="normal"
            {...props}
        />
    );
};

export default CustomTextField;
