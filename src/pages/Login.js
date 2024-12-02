import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { APIURL } from '../constants';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const configuration = {
        method: "post",
        url: `${APIURL}login`,
        data: {
            username,
            password,
        },
    };

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        
        axios(configuration)
        .then((result) => {
            setLogin(true);
            cookies.set("TOKEN", result.data.token, {
                path: "/",
            });
            alert('Login Success!')
            // redirect user to the auth page
            window.location.href = "/home";
        })
        .catch((error) => {
            setError(error.response.data.message)
        });
    }

    if(token) {
        return <Navigate to='/home' replace />
    }

    return (
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <div>
                <h2>Login</h2>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    {/* username */}
                    <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                    </Form.Group>

                    {/* password */}
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    </Form.Group>

                    {/* submit button */}
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Login
                    </Button>
                    {login ? (
                        <p className="text-success">You Are Logged in Successfully</p>
                    ) : (
                        <p className="text-danger">{error}</p>
                    )}
                </Form>
            </div>
        </div>
    )
}