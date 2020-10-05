export const queryReport = (props) => {
    const {
        viewID,
    } = props;

    const requestDimensions = (dimensions) => {
        let result = [];
        dimensions.forEach((item) => {
            result.push({
                name: item,
            });
        });
        return result;
    };
    return window.gapi.client.request({
        path: "/v4/reports:batchGet",
        root: "https://analyticsreporting.googleapis.com/",
        method: "POST",
        body: {
            reportRequests: [
                {
                    viewId: viewID,
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
    });
};
