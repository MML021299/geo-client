import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIURL } from "../constants";

const Info = ({ userIp, user }) => {
    const [ipSearch, setIpSearch] = useState("");
    const [locInfo, setLocInfo] = useState([]);
    const [ipHistory, setIpHistory] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

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
            history: ipSearch,
            userId: user.userId,
        },
    };

    const getHistory = {
        method: "post",
        url: `${APIURL}get-history`,
        data: {
            userId: user.userId,
        },
    };

    const searchIp = () => {
        axios(searchUserGeo)
            .then((result) => {
                if (result.data.ip && result.data.loc) {
                    setLocInfo(result.data);
                    axios(saveHistory)
                        .then(() => {
                            console.log("Search history saved");
                            setIpSearch("");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    alert("Invalid Ip Address!")
                }
            })
            .catch((error) => {
                alert("Invalid IP Address!");
                console.log(error);
            });
    };

    const fetchIpHistory = () => {
        axios(getHistory)
            .then((result) => {
                setIpHistory(result.data)
                setIsFocused(true)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios(getUserGeo)
            .then((result) => {
                setLocInfo(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userIp]);

    return (
        <div style={{ width: "800px" }}>
            <div className="input-container">
                <input
                    type="text"
                    className="ip-input"
                    value={ipSearch}
                    onChange={(e) => setIpSearch(e.target.value)}
                    placeholder="Enter new IP Address"
                    onFocus={fetchIpHistory}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                <button onClick={searchIp}>Submit</button>
            </div>
            {isFocused && (
                <div className="dropdown-container">
                    <ul>
                        {ipHistory.sort((a, b) => b.id - a.id).map((x) => (
                            <li key={x.id} className="dropdown_item">
                                <div onClick={() => {setIpSearch(x.ip_address)}} className="item_text1">{x.ip_address}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <h1 style={{ display: "block" }}>Coordinates: {locInfo.loc}</h1>
                <h1 style={{ display: "block" }}>IP Address: {locInfo.ip}</h1>
            </div>
        </div>
    );
};

export default Info;