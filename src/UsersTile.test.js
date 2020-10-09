import React, {useState} from 'react';
import ReactDOM from "react-dom";
import UsersTile from './UsersTile.jsx';
import {sites} from './dashboardConfig.js';
import { BrowserRouter as Router } from "react-router-dom";
import addDays from "date-fns/addDays";

jest.mock('./queryReport', () => {
    const response = require("./testReportResponse.json");
    return {
        queryReport: jest.fn(() => {
            return response;
        })
    }
});

const site = sites[0]
const startDate = addDays(new Date(), -30)
const endDate = new Date()

// it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Router><UsersTile key={site.route} site={site} startDate={startDate} endDate={endDate}/></Router>, div);
//     ReactDOM.unmountComponentAtNode(div);
// });

// it('renders a tile for each site', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Router><Dashboard sites={sites}/></Router>, div);
//     expect(div.querySelectorAll("h2")).toHaveLength(7)
// });
//
// it('uses the same order from the config file for the tiles', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Router><Dashboard sites={sites}/></Router>, div);
//     expect(div.querySelector("h2").textContent).toBe("Comment collection")
// });
