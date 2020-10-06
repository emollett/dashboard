import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./utils";
import Report from './Report.jsx';
import styled from 'styled-components'

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
                <Tiles>
                    <Report siteName={"Comment collection"} viewID={process.env.REACT_APP_VIEW_ID_1}/>
                    <Report siteName={"UKPS"} viewID={process.env.REACT_APP_VIEW_ID_2}/>
                    <Report siteName={"META"} viewID={process.env.REACT_APP_VIEW_ID_1}/>
                    <Report siteName={"Healthtech Connect"} viewID={process.env.REACT_APP_VIEW_ID_2}/>
                    <Report siteName={"NICE Docs"} viewID={process.env.REACT_APP_VIEW_ID_1}/>
                    <Report siteName={"NICE Accounts - new"} viewID={process.env.REACT_APP_VIEW_ID_2}/>
                    <Report siteName={"NICE Accounts - old"} viewID={process.env.REACT_APP_VIEW_ID_1}/>
               </Tiles>
            )}
        </div>
    );
}

export default App;


