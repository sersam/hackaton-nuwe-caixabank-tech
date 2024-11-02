import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { profilerData } from '../utils/profilerData';

function DownloadProfilerData() {
    const handleDownload = () => {
        if (profilerData.length === 0) {
            alert('No profiler data available to download.');
            return;
        }

        // Convert the data to a JSON format
        const jsonData = JSON.stringify(profilerData);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Generate a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'profilerData.json'; // Set the file name

        // Append to the body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download Profiler Data
        </Button>
    );
}

export default DownloadProfilerData;
