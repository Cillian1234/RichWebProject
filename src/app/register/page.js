'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {redirect} from "next/navigation";


export default function MyApp() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [error, setError] = React.useState(false);

    function handleError(error) {
        setError(error => !error);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newUsername = username.toLowerCase()

        setUsername(newUsername.trim());
        setPassword(password.trim());
        setPassword2(password2.trim());

        if (password === password2) {
            try {
                fetch(`/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicate the type of data being sent
                    },
                    body: JSON.stringify({
                        username, password
                    })
                })

            } catch (err) {
                console.error(err);
            } finally {
                setPassword('')
                redirect('/')
            }
        } else {
            handleError();
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
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    required
                    onChange={(e) => {
                        setPassword2(e.target.value);
                    }}
                />

                <Button
                    variant="contained"
                    className="loginButton"
                    onClick={handleSubmit}
                >
                    Log in
                </Button>

                {error &&
                    <p>Username already in use or passwords do not match, please try again</p>
                }
            </Box>
        </Box>
    );
}