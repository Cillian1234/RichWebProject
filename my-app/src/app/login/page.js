'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {FormControl, Input, InputLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";


export default function MyApp() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username, password
                })
            })
            if (!res.ok) throw new Error(res.statusText);

            const {token} = await res.json();
            document.cookie = `token= + ${token}; path=/`
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Box>
            <Navbar />

            <Box className="login">
                <h1 className="loginHeader">Log in</h1>

                <TextField
                    variant="outlined"
                    label="Username"
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <br/>
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <Button variant="contained" className="loginButton">Log in</Button>
            </Box>
        </Box>
    );
}