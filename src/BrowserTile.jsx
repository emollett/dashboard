import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { queryReport } from "./queryReport";

const BrowsersTile = ({
        site: {siteName, viewID, route},
        startDate,
        endDate
    }) => {
    const INITIAL_STATE = {
        labels: [],
        values: [],
        colors: [],
    };
    const [data, setdata] = useState(INITIAL_STATE);
    const colors = [
        "#004650",
        "#a2bdc1",
        "#451551",
        "#517489",
        "#0e0e0e",
        "#393939",
        "#a2bdc1",
        "#314c60",
    ];

    const displayResults = (response) => {
        const queryResult = response.result.reports[0].data.rows;
        let labels = [];
        let values = [];
        let bgColors = [];
        queryResult.forEach((row, id) => {
            labels.push(row.dimensions[0]);
            values.push(row.metrics[0].values[0]);
            bgColors.push(colors[id]);
        });
        setdata({
            ...data,
            labels,
            values,
            colors: bgColors,
        });
    };

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: data.colors,
            },
        ],
    };

    const options = {
        legend: { position: "bottom" },
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                font: {
                    size: 0,
                },
            },
        },
    };

    useEffect(() => {
        const request = {
            viewID: viewID,
            startDate: startDate,
            endDate: endDate,
            dimensions: "ga:browser",
        };
        setTimeout(
            () =>
                queryReport(request)
                    .then((resp) => displayResults(resp))
                    .catch((error) => console.error(error)),
            1500
        );
    }, [viewID, startDate, endDate]);

    return (
        <>
            {data && (
                <Pie data={chartData} options={options} width={300} height={300} />
            )}
        </>
    );
};

export default BrowsersTile;
