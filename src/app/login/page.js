'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";


export default function MyApp() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            fetch(`/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indicate the type of data being sent
                },
                body: JSON.stringify({
                    username, password
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Response from server", data)
                })

        } catch (err) {
            console.error(err);
        }
        setPassword('')
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

                <Button
                    variant="contained"
                    className="loginButton"
                    onClick={handleSubmit}
                >
                    Log in
                </Button>
            </Box>
        </Box>
    );
}