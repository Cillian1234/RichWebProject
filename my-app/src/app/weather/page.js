'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";


export default function MyApp() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />

            <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                This will be the weather page.
            </Box>
        </Box>
    );
}