import React, { useState, useEffect } from "react";
import "./App.css";
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

    const Tiles = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 1em;
    `;

    return (
        <div className="App">
            <h1>Stakeholders team's dashboard</h1>
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
                        <Report siteName={"Comment collection"} viewID={process.env.REACT_APP_VIEW_ID_1} startDate={startDate} endDate={endDate}/>
                        <Report siteName={"UKPS"} viewID={process.env.REACT_APP_VIEW_ID_2} startDate={startDate} endDate={endDate}/>
                        <Report siteName={"META"} viewID={process.env.REACT_APP_VIEW_ID_1} startDate={startDate} endDate={endDate}/>
                        <Report siteName={"Healthtech Connect"} viewID={process.env.REACT_APP_VIEW_ID_2} startDate={startDate} endDate={endDate}/>
                        <Report siteName={"NICE Docs"} viewID={process.env.REACT_APP_VIEW_ID_1} startDate={startDate} endDate={endDate}/>
                        <Report siteName={"NICE Accounts - new"} viewID={process.env.REACT_APP_VIEW_ID_2} startDate={startDate} endDate={endDate}/>
                        <Report siteName={"NICE Accounts - old"} viewID={process.env.REACT_APP_VIEW_ID_1} startDate={startDate} endDate={endDate}/>
                    </Tiles>
                </>
            )}
        </div>
    );
}

export default App;


