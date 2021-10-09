import dynamic from 'next/dynamic';
import React from 'react';
import theme from '../theme';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';

export const Plot = dynamic(import('react-plotly.js'), {
    ssr: false,
    loading: () => (
        <>
            <Box sx={{ minWidth: '25vw' }}>
                <Typography sx={{m: 'auto'}}>
                    Loading Chart...
                </Typography>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: () => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
});