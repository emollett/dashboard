import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js";
import { queryReport } from "./queryReport";
import { formatDate } from "./utils";

const ChartWrapper = styled.div`
    width: 23em;
    margin: 0 auto;
`;

const DashboardTile = ({
        site: {siteName, viewID, route},
        startDate,
        endDate,
        title
    }) => {
    const INITIAL_STATE = {
        labels: [],
        values: [],
    };
    const [data, setData] = useState(INITIAL_STATE);

    const displayResults = (response) => {
        const queryResult = response.result.reports[0].data.rows;
        let labels = [];
        let values = [];
        queryResult.forEach((row) => {
            labels.push(formatDate(row.dimensions[0]));
            values.push(row.metrics[0].values[0]);
        });
        setData({
            ...data,
            labels,
            values,
        });
    };

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "Daily users",
                fill: false,
                lineTension: 0.3,
                borderColor: "#35213d",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#375751",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.values,
            },
        ],
    };

    const options = {
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
        legend: {
            display: false,
        },
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
            dimensions: ["ga:date"],
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, [viewID, startDate, endDate]);

    return (
        <>
            {title && (
                <Link to={`/${route}`}><h2>{siteName}</h2></Link>
            )}
            {!title && (<h3>Daily users</h3>)}
            {data && (
                <ChartWrapper>
                    <Line data={chartData} options={options} width={100} height={250} />
                </ChartWrapper>
            )}

        </>
    )
};

export default DashboardTile;
