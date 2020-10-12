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
import { sites } from './dashboardConfig.js';

const Container = styled.div`
        text-align: center;
    `;

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

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

    return (
        <Container>
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
        </Container>
    );
}

export default App;


