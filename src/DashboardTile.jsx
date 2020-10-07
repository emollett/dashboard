import React, { useState, useEffect } from "react";
import { queryReport } from "./queryReport";
import styled from 'styled-components'
import { Link } from "react-router-dom";

const DashboardTile = ({
    site: {siteName, viewID, route},
    startDate,
    endDate
}) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState([])

    const displayResults = (response) => {
        setTotal(response.result.reports[0].data.totals[0].values[0]);
        const queryResult = response.result.reports[0].data.rows;
        const result = queryResult.map((row) => {
            const dateSting = row.dimensions[0];
            const formattedDate = `${dateSting.substring(0, 4)}-${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
            return {
                date: formattedDate,
                visits: row.metrics[0].values[0],
            };
        });
        setData(result);
    };

    useEffect(() => {
        const request = {
            viewID: viewID,
            startDate: startDate,
            endDate: endDate,
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, [startDate, endDate]);

    const Tile = styled.div`
        background-color: #fafafa;
        flex: 0 1 25em;
        margin: 1em;
        box-shadow: 0.1em 0.1em 0.3em #e9e9e9;
        padding-bottom: 0.5em;
    `;

    return (
        <Tile>
            <Link to={`/${route}`}><h2>{siteName}</h2></Link>
            <p>Total - {total} visits</p>
            {data.map((row) => (
                <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>
                ))}
        </Tile>
    )
};

export default DashboardTile;
