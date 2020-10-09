import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import { queryReport } from "./queryReport";
import { formatDate, transformToDate, colors } from "./utils";

const SourceTile = ({
        site: {siteName, viewID, route},
        startDate,
        endDate
    }) => {
    const INITIAL_STATE = {
        labels: [],
        datasets: [],
    };
    const [reportData, setReportData] = useState(INITIAL_STATE);

    const transformAPIData = (data) => {
        let transformedData = [];
        let datesArray = [];
        data.forEach((row) => {
            transformedData.push({
                date: formatDate(row.dimensions[1]),
                source: row.dimensions[0],
                visits: row.metrics[0].values[0],
            });
            datesArray.push(transformToDate(row.dimensions[1]));
        });
        return [transformedData, datesArray];
    };

    const groupDataBySource = (data) => {
        return data.reduce((r, a) => {
            r[a.source] = r[a.source] || [];
            r[a.source].push(a);
            return r;
        }, Object.create(null));
    };

    const sortSourcesByTotalVisits = (data) => {
        let sumedVisits = [];
        for (let [key, value] of Object.entries(data)) {
            const sumOfVisits = value.reduce((a, b) => {
                return a + parseInt(b.visits);
            }, 0);
            sumedVisits.push({
                source: key,
                visits: sumOfVisits,
            });
        }
        return sumedVisits.sort((a, b) => b.visits - a.visits);
    };

    const createDataForChart = (datesArray, sumedVisits, groupedBySource) => {
        datesArray.sort((a, b) => {
            return new Date(a) - new Date(b);
        });
        const datesFormatted = datesArray.map((date) =>
            format(new Date(date), "dd/MM")
        );
        const uniqueDates = [...new Set(datesFormatted)];
        let datasetsArray = [];
        let i = 0;
        sumedVisits.forEach((item, id) => {
            if (id < 5) {
                const label = item.source;
                const backgroundColor = colors[i + 3];
                i++;
                let data = [];
                uniqueDates.forEach((date) => {
                    const row = groupedBySource[item.source].find(
                        (item) => item.date === date
                    );
                    if (row) {
                        data.push(parseInt(row.visits));
                    } else {
                        data.push(0);
                    }
                });
                datasetsArray.push({
                    label,
                    backgroundColor,
                    data,
                });
            }
        });
        return { labels: uniqueDates, data: datasetsArray };
    };

    const displayResults = (response) => {
        const queryResult = response.result.reports[0].data.rows;

        const data = transformAPIData(queryResult);
        let transformedData = data[0];
        let datesArray = data[1];

        const groupedBySource = groupDataBySource(transformedData);

        const sumedVisits = sortSourcesByTotalVisits(groupedBySource);

        const dataForChart = createDataForChart(
            datesArray,
            sumedVisits,
            groupedBySource
        );

        setReportData({
            ...reportData,
            labels: dataForChart.labels,
            datasets: dataForChart.data,
        });
    };

    const options = {
        tooltips: {
            displayColors: true,
            callbacks: {
                mode: "x",
            },
        },
        scales: {
            xAxes: [
                {
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                    type: "linear",
                },
            ],
        },
        maintainAspectRatio: false,
        legend: { position: "bottom" },
        plugins: {
            datalabels: {
                font: {
                    size: 0,
                },
            },
        },
    };

    const data = {
        labels: reportData.labels,
        datasets: reportData.datasets,
    };

    useEffect(() => {
        const request = {
            viewID: viewID,
            startDate,
            endDate,
            dimensions: ["ga:source", "ga:date"],
        };
        setTimeout(
            () =>
                queryReport(request)
                    .then((resp) => displayResults(resp))
                    .catch((error) => console.error(error)),
            1100
        );
    }, [startDate, endDate]);

    return (
        <>
            <h3>Traffic source</h3>
            {reportData && (
                <Bar data={data} width={100} height={250} options={options} />
            )}
        </>
    );
};

export default SourceTile;
