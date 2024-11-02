import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function RecommendationCard({ title, message }) {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography>{message}</Typography>
            </CardContent>
        </Card>
    );
}

export default RecommendationCard;
