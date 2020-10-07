import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "./utils";
import Report from './Report.jsx';
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [startDate, setStartDate] = useState(addDays(new Date(), -10));
    const [endDate, setEndDate] = useState(new Date());

    const sites = [
        {siteName: "Comment collection" , viewID: process.env.REACT_APP_VIEW_ID_1},
        {siteName: "UKPS" , viewID: process.env.REACT_APP_VIEW_ID_2},
        {siteName: "META" , viewID: process.env.REACT_APP_VIEW_ID_1},
        {siteName: "HealthTech Connect" , viewID: process.env.REACT_APP_VIEW_ID_1},
        {siteName: "NICE Accounts - new" , viewID: process.env.REACT_APP_VIEW_ID_1},
        {siteName: "NICE Accounts - old" , viewID: process.env.REACT_APP_VIEW_ID_1},
        {siteName: "NICE Docs" , viewID: process.env.REACT_APP_VIEW_ID_1},
    ]

    const updateSignin = (signedIn) => {
        setIsSignedIn(signedIn);
        if (!signedIn) {
            renderButton();
        }
    };

    const init = () => {
        checkSignedIn()
            .then((signedIn) => {
                updateSignin(signedIn);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        window.gapi.load("auth2", init);
    });

    const App = styled.div`
        text-align: center;
    `;

    const Tiles = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1em;
    `;

    return (
        <App>
            <h1>Stakeholders team dashboard</h1>
            {!isSignedIn ? (
                <div id="signin-button"></div>
            ) : (
                <>
                    <label>Start date
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date()}
                        dateFormat="dd MMM yyyy"
                    /></label>
                    &nbsp;
                    <label>End date
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="dd MMM yyyy"
                    /></label>
                    <Tiles>
                        {sites.map((site, index) => (
                            <Report siteName={site.siteName} viewID={site.viewID} startDate={startDate} endDate={endDate}/>
                        ))}
                    </Tiles>
                </>
            )}
        </App>
    );
}

export default App;


