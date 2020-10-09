import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { queryReport } from "./queryReport";
import { colors } from "./utils";

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
            dimensions: ["ga:browser"],
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
            <h3>Browser usage</h3>
            {data && (
                <Pie data={chartData} options={options} width={100} height={100} />
            )}
        </>
    );
};

export default BrowsersTile;
