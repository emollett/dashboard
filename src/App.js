import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./utils";
import Report from './Report.jsx';

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
        <div className="App">
            <h1>Stakeholders team's dashboard</h1>
            {!isSignedIn ? (
                <div id="signin-button"></div>
            ) : (
                <>
                   <Report siteName={"Comment collection"} viewID={process.env.REACT_APP_VIEW_ID_1}/>
                   <Report siteName={"UKPS"} viewID={process.env.REACT_APP_VIEW_ID_2}/>
               </>
            )}
        </div>
    );
}

export default App;
