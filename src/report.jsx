import React, { useState, useEffect } from "react";

const Report = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState([])

    useEffect(() => {
        const queryReport = () => {
            window.gapi.client
                .request({
                    path: "/v4/reports:batchGet",
                    root: "https://analyticsreporting.googleapis.com/",
                    method: "POST",
                    body: {
                        reportRequests: [
                            {
                                viewId: process.env.REACT_APP_VIEW_ID,
                                dateRanges: [
                                    {
                                        startDate: "7daysAgo",
                                        endDate: "today",
                                    },
                                ],
                                metrics: [
                                    {
                                        expression: "ga:users",
                                    },
                                ],
                                dimensions: [
                                    {
                                        name: "ga:date",
                                    },
                                ],
                            },
                        ],
                    },
                })
                .then(displayResults, console.error.bind(console));
        };

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

        queryReport();
    }, []);

    return (
        <div>
            <p>Total - {total} visits</p>
            {data.map((row) => (
            <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div>
            ))}
        </div>
    )
};

export default Report;
