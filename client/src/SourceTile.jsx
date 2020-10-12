import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { queryReport } from "./queryReport";
import { colors, ChartWrapper } from "./utils";

const SourceTile = ({
        site: {viewID},
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
        legend: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 7,
                    },
                },
            ],
        },
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
            dimensions: ["ga:source"],
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
            <h3>Traffic source</h3>
            {data && (
                <ChartWrapper><Bar data={chartData} width={100} height={250} options={options} /></ChartWrapper>
            )}
        </>
    );
};

export default SourceTile;
