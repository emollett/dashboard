import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "./utils";
import Dashboard from './Dashboard.jsx';
import ReportFull from './ReportFull.jsx';
import styled from 'styled-components'
import "react-datepicker/dist/react-datepicker.css";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const sites = [
        {siteName: "Comment collection" , viewID: process.env.REACT_APP_VIEW_ID_1, route:"comment-collection"},
        {siteName: "UKPS" , viewID: process.env.REACT_APP_VIEW_ID_2, route:"ukps"},
        {siteName: "META" , viewID: process.env.REACT_APP_VIEW_ID_1, route:"meta"},
        {siteName: "HealthTech Connect" , viewID: process.env.REACT_APP_VIEW_ID_1, route:"healthtech-connect"},
        {siteName: "NICE Accounts - new" , viewID: process.env.REACT_APP_VIEW_ID_1, route:"nice-accounts-new"},
        {siteName: "NICE Accounts - old" , viewID: process.env.REACT_APP_VIEW_ID_1, route:"nice-accounts-old"},
        {siteName: "NICE Docs" , viewID: process.env.REACT_APP_VIEW_ID_1, route:"nice-docs"},
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

    return (
        <App>
            <Router>
                <Link to="/"><h1>Stakeholders team dashboard</h1></Link>
                {!isSignedIn ? (
                    <div id="signin-button"></div>
                ) : (
                    <>
                        <Route exact path="/" render={() => <Dashboard sites={sites} />} />
                        <Route exact path="/:id" render={() => <ReportFull sites={sites} />} />
                    </>
                )}
            </Router>
        </App>
    );
}

export default App;


