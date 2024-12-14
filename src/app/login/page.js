'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Navbar from "@/components/Navbar";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import {redirect} from "next/navigation";
import validator from 'email-validator'
import jsesc from "jsesc";


export default function MyApp() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    function handleError(errorMessage) {
        setErrorMessage(errorMessage);
        setError(true);
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

    function escaping(input) {
        return jsesc(input);
    }

    // TODO: escaping + backend validation

    async function handleSubmit(e) {
        e.preventDefault();

        // Trim leading or trailing space characters
        setUsername(escaping(username.trim()));
        setPassword(escaping(password.trim()));
        let loginSuccess = false;

        setError(false); // Assume valid

        // Check inputs
        checkEmail()
        checkInputLength()

        // If error present don't continue with login
        if (!error) {
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
                            handleError("Email or password not found");
                        } else {
                            loginSuccess = true;
                            console.log(data);
                        }
                    })
            } catch (err) {
                console.error(err);
            } finally {
                redirect('/')
            }
            setPassword('')
        }
    }

    return (
        <Box>
            <Navbar />

            <Box className="login">
                <h1 className="loginHeader">Log in</h1>

                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    required
                    onChange={(e) => {setUsername(e.target.value);}}
                    onBlur={checkEmail}
                />
                <br/>
                <TextField
                    variant="outlined"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={(e) => {setPassword(e.target.value);}}
                />

                <Button
                    variant="contained"
                    className="loginButton"
                    onClick={handleSubmit}
                >
                    Log in
                </Button>

                {error &&
                    <p>{errorMessage}
                        <br/>
                    <Link className="createAccountLink" href="./register">Create an account</Link>
                    instead!</p>
                }
            </Box>
        </Box>
    );
}