import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { APIURL } from "../constants";
import Info from "../components/Info";

import "../App.css"

export default function Home() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const [userIp, setUserIp] = useState("");
    const [user, setUser] = useState([]);

    // get logged in user info
    const getUserInfo = {
        method: "get",
        url: `${APIURL}auth-endpoint`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        axios(getUserInfo)
        .then((result) => {
            setUserIp(result.data.ip);
            setUser(result.data.user);
        })
        .catch((error) => {
            error = new Error();
        });
    }, [userIp])

    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";
    }
    
    return (
        <>
            <div className="header">
                <h1>Geolocation & IP Info</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <div className="app">
                <div className="info-container">
                    <Info
                        userIp={userIp}
                        user={user}
                    />
                </div>
            </div>
        </>
    );
}