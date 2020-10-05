import React, { useState, useEffect } from "react";
import { queryReport } from "./queryReport";

const Report = (props) => {
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
            viewID: props.viewID,
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>{props.siteName}</h2>
            <p>Total - {total} visits</p>
            {data.map((row) => (
            <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>
            ))}
        </div>
    )
};

export default Report;
