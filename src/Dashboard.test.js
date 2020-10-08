import React from 'react';
import ReactDOM from "react-dom";
import Dashboard from './Dashboard.jsx';
import {sites} from './dashboardConfig.js';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock('./DashboardTile.jsx', () => {
    return function DashboardTile(props) {
        return (
            <>
                <h2>{props.site.siteName}</h2>
                <div>
                </div>
            </>
        );
    };
});

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Dashboard sites={sites}/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders a tile for each site', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Dashboard sites={sites}/></Router>, div);
    expect(div.querySelectorAll("h2")).toHaveLength(7)
});

it('uses the same order from the config file for the tiles', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Dashboard sites={sites}/></Router>, div);
    expect(div.querySelector("h2").textContent).toBe("Comment collection")
});
