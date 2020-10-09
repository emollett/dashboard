import React, { useState, useEffect } from "react";
import { queryReport } from "./queryReport";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import styled from "styled-components";
import DashboardTile from "./DashboardTile";
import BrowserTile from "./BrowserTile";
import SourceTile from "./SourceTile";

const Tiles = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1em;
    `;

const Tile = styled.div`
     background-color: #fafafa;
     flex: 0 1 25em;
     margin: 1em;
     box-shadow: 0.1em 0.1em 0.3em #e9e9e9;
     padding-bottom: 0.5em;
    `;

const ReportTile = ({sites}) => {
    let { id } = useParams();

    const route = (site) => site.route === id;
    const site = sites[sites.findIndex(route)];

    const [data, setData] = useState([]);
    const [total, setTotal] = useState([]);
    const [startDate, setStartDate] = useState(addDays(new Date(), -10));
    const [endDate, setEndDate] = useState(new Date());

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
            viewID: site.viewID,
            startDate: startDate,
            endDate: endDate,
            dimensions: ["ga:date"],
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, [site.viewID, startDate, endDate]);

    return (
        <>
            <h2>Full report for {site.siteName}</h2>
            <label>Start date&nbsp;
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={new Date()}
                    dateFormat="dd MMM yyyy"
                /></label>
            &nbsp;&nbsp;
            <label>End date&nbsp;
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
                <Tile>
                    <h3>Total - {total} visits</h3>
                    {data.map((row) => (
                        <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>
                    ))}
                </Tile>
                <Tile>
                    <DashboardTile key={site.route} site={site} startDate={startDate} endDate={endDate} />
                </Tile>
                <Tile>
                    <BrowserTile key={site.route} site={site} startDate={startDate} endDate={endDate} />
                </Tile>
                <Tile>
                    <SourceTile key={site.route} site={site} startDate={startDate} endDate={endDate} />
                </Tile>
            </Tiles>
        </>
    )
};

export default ReportTile;
