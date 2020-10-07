import React, { useState } from "react";
import DashboardTile from './DashboardTile.jsx';
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';

function Dashboard(props) {
    const [startDate, setStartDate] = useState(addDays(new Date(), -10));
    const [endDate, setEndDate] = useState(new Date());

    const sites = props.sites

    const Tiles = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1em;
    `;

    return (
                <>
                    <label>Start date
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                            dateFormat="dd MMM yyyy"
                        /></label>
                    &nbsp;
                    <label>End date
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd MMM yyyy"
                        /></label>
                    <Tiles>
                        {sites.map((site) => (
                            <DashboardTile site={site} startDate={startDate} endDate={endDate}/>
                        ))}
                    </Tiles>
                </>
    );
}

export default Dashboard;


