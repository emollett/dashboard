import React, { useState } from "react";
import UsersTile from './UsersTile.jsx';
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';

const Tiles = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1em;
    `;

const Tile = styled.div`
     background-color: #fafafa;
     flex: 0 1 25em;
     margin: 1em;
     box-shadow: 0.1em 0.1em 0.3em #e9e9e9;
     padding-bottom: 0.5em;
    `;

function Dashboard({sites}) {
    const [startDate, setStartDate] = useState(addDays(new Date(), -30));
    const [endDate, setEndDate] = useState(new Date());

    return (
                <>
                    <label>Start date&nbsp;
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                            dateFormat="dd MMM yyyy"
                        /></label>
                    &nbsp;&nbsp;
                    <label>End date&nbsp;
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
                            <Tile><UsersTile key={site.route} site={site} startDate={startDate} endDate={endDate} title={true}/></Tile>
                        ))}
                    </Tiles>
                </>
    );
}

export default Dashboard;


