'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import {redirect} from "next/navigation";


export default function MyApp() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    function handleError() {
        setError(error => !error);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setUsername(username.trim());
        setPassword(password.trim());

        console.log(username, password);

        let loginSuccess = false;

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
                    if (!data) {
                        handleError();
                    } else {
                        loginSuccess = true;
                    }
                })
        } catch (err) {
            console.error(err);
        } finally {
            if (loginSuccess) {
                saveSessionData()
                redirect('/')
            }
        }
        setPassword('')
    }

    function saveSessionData() {
        fetch(`/api/saveData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Indicate the type of data being sent
            },
            body: JSON.stringify({
                username
            })
        })
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

                {error &&
                    <p>Incorrect username or password, try
                    <Link className="createAccountLink" href="./register">create an account</Link>
                    instead!</p>
                }
            </Box>
        </Box>
    );
}