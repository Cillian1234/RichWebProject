'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {redirect} from "next/navigation";
import jsesc from "jsesc";
import validator from "email-validator";


export default function MyApp() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    function handleError(errorMessage) {
        setErrorMessage(errorMessage);
        setError(true);
    }

    function escaping(input) {
        return jsesc(input);
    }

    function checkEmail() {
        if (!validator.validate(username)) {
            handleError("Invalid email");
        }
    }

    function checkInputLength() {
        if (username.length < 1 || username.length > 32) {
            handleError("Invalid email or password length");
        } else if (password.length < 1 || password.length > 32) {
            handleError("Invalid email or password length");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setUsername(escaping(username.trim()));
        setPassword(escaping(password.trim()));
        setPassword2(escaping(password2.trim()));

        checkEmail()
        checkInputLength()

        if (!error && password === password2) {
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
            handleError("Whoops");
        }
    }

    return (
        <Box>
            <Navbar />

            <Box className="login">
                <h1 className="loginHeader">Register</h1>

                <TextField
                    variant="outlined"
                    label="Email"
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    onBlur={checkEmail}
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
                    Register
                </Button>

                {error &&
                    <p>{errorMessage}</p>
                }
            </Box>
        </Box>
    );
}