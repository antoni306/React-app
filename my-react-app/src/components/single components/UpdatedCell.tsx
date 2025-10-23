import React, { useState, useEffect, useRef } from "react";
import { TableCell } from "@mui/material";
import { v4 } from "uuid"
export default function CountDown(props: { dateTo: Date }) {
    const tableCellRef = useRef<HTMLTableCellElement | null>(null);
    const intervalRef = useRef<number | null>(null);
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (!tableCellRef.current) return;
            let timeRemaing = props.dateTo.getTime() - Date.now();
            let seconds = Math.max(0, Math.floor(timeRemaing / 1000));
            let hours = Math.floor(seconds / 3600);
            let days = Math.floor(hours / 24);
            let minutes = Math.floor((seconds % 3600) / 60);
            let secs = seconds % 60;
            tableCellRef.current.textContent = `${days}:${hours % 24}:${minutes % 60}:${secs}`;
            console.log("interwal " + props.dateTo.toISOString())

        }, 1000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);


    return (
        <TableCell ref={tableCellRef} component="th" scope="row">
        </TableCell>
    );
}   