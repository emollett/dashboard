import { format } from "date-fns";

export const queryReport = (props) => {
    const {
        viewID,
        startDate,
        endDate
    } = props;

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
                            startDate: format(new Date(startDate), "yyyy-MM-dd"),
                            endDate: format(new Date(endDate), "yyyy-MM-dd"),
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
