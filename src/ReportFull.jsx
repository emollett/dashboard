import React, { useState, useEffect } from "react";
import { queryReport } from "./queryReport";
import styled from 'styled-components'
import { useParams } from "react-router-dom";

const ReportTile = (sites) => {
    let { id } = useParams();

    return (
        <>
            <h2>Full report for {id}</h2>
        </>
    )
};

export default ReportTile;
