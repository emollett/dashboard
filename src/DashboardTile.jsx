import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js";
import { format } from "date-fns";

import { queryReport } from "./queryReport";

const Tile = styled.div`
     background-color: #fafafa;
     flex: 0 1 25em;
     margin: 1em;
     box-shadow: 0.1em 0.1em 0.3em #e9e9e9;
     padding-bottom: 0.5em;
    `;

const ChartWrapper = styled.div`
    width: 23em;
    margin: 0 auto;
`;

const formatDate = (string) => {
    return format(
        new Date(
            string.substring(0, 4),
            string.substring(4, 6) - 1,
            string.substring(6, 8)
        ),
        "dd/MM"
    );
};

const DashboardTile = ({
        site: {siteName, viewID, route},
        startDate,
        endDate
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
            display: true,
            align: "end",
            labels: {
                boxWidth: 0,
            }
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
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, [viewID, startDate, endDate]);

    return (
        <Tile>
            <Link to={`/${route}`}><h2>{siteName}</h2></Link>

            {data && (
                <ChartWrapper>
                    <Line data={chartData} options={options} width={100} height={250} />
                </ChartWrapper>
            )}

        </Tile>
    )
};

export default DashboardTile;
