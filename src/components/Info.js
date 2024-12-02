import React, { useEffect, useState } from 'react';
import axios from "axios";
import { APIURL } from "../constants";

const Info = ({ userIp }) => {
    const [ipSearch, setIpSearch] = useState('');
    const [locInfo, setLocInfo] = useState([]);

    // get logged in user Geo info
    const getUserGeo = {
        method: "get",
        url: `https://ipinfo.io/${userIp}/geo`,
    };

    const searchUserGeo = {
        method: "get",
        url: `https://ipinfo.io/${ipSearch}/geo`,
    };

    const saveHistory = {
        method: "post",
        url: `${APIURL}save-history`,
        data: {
            history: ipSearch
        }
    };

    const searchIp = () => {
        axios(searchUserGeo)
        .then((result) => {
            setLocInfo(result.data);
            axios(saveHistory)
            .then(() => {
                console.log('search history saved')
                setIpSearch("")
            })
            .catch((error) => {
                console.log(error)
            });
        })
        .catch((error) => {
            alert('Invalid IP Address!')
            console.log(error)
        });
    };

    useEffect(() => {
        axios(getUserGeo)
        .then((result) => {
            setLocInfo(result.data);
        })
        .catch((error) => {
            error = new Error();
        });
    }, [userIp])

    return (
        <div style={{width: '800px'}}>
            <div className="input-container">
                <input
                    type="text"
                    className="ip-input"
                    value={ipSearch}
                    onChange={(e) => setIpSearch(e.target.value)}
                    placeholder="Enter new IP Address"
                />
                <button onClick={searchIp}>Submit</button>
            </div>
            <div>
                <h1 style={{display: 'block'}}>Coordinates: {locInfo.loc}</h1>
                <h1 style={{display: 'block'}}>IP Address: {locInfo.ip}</h1>
            </div>
        </div>
    );
};

export default Info;