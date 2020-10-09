import {format} from "date-fns";
import styled from "styled-components";

const initAuth = () => {
    return window.gapi.auth2.init({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
};

export const checkSignedIn = () => {
    return new Promise((resolve, reject) => {
        initAuth()
            .then(() => {
                const auth = window.gapi.auth2.getAuthInstance();
                resolve(auth.isSignedIn.get());
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const renderButton = () => {
    window.gapi.signin2.render("signin-button", {
        scope: "profile email",
        width: 240,
        height: 50,
        longtitle: true,
        theme: "dark",
        onsuccess: onSuccess,
        onfailure: onFailure,
    });
};

const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
    console.error(error);
};

export const formatDate = (string) => {
    return format(
        new Date(
            string.substring(0, 4),
            string.substring(4, 6) - 1,
            string.substring(6, 8)
        ),
        "dd/MM"
    );
};

export const transformToDate = (string) => {
    return new Date(
        string.substring(0, 4),
        string.substring(4, 6) - 1,
        string.substring(6, 8)
    );
};

export const colors = [
    "#004650",
    "#a2bdc1",
    "#451551",
    "#517489",
    "#0e0e0e",
    "#393939",
    "#a2bdc1",
    "#314c60",
];

export const ChartWrapper = styled.div`
    width: 23em;
    margin: 0 auto;
`;
