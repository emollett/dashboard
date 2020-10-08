import React, { useState, useEffect } from "react";
import { queryReport } from "./queryReport";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

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
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, [site.viewID, startDate, endDate]);

    return (
        <>
            <h2>Full report for {site.siteName}</h2>
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
            &nbsp;
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
            <p>Total - {total} visits</p>
            {data.map((row) => (
                <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>
            ))}
        </>
    )
};

export default ReportTile;
