import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UpdatedCell from "./UpdatedCell"
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Task } from "../types"



function Row(props: { row: Task, deleteAction: (task: Task) => void }) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const date = row.date.toISOString().split("T")[0];
    const time = row.date.toISOString().split("T")[1].split(".")[0];

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <UpdatedCell dateTo={row.date} />

                <TableCell>
                    <Button onClick={() => props.deleteAction(row)}><DeleteIcon /></Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Task
                            </Typography>
                            <Typography variant='overline'>
                                {row.task}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props: { notes: Task[], onDelete: (task: Task) => void }) {
    const [itemToDelete, setItemToDel] = useState<Task | null>(null);


    // onDelete={(task: Task) => deleteRow(task, props.notes)}
    return (
        <TableContainer component={Paper} elevation={12} sx={{ float: "left", width: 500, ml: 5 }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Date</TableCell>
                        <TableCell>Time remaining</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.notes.map((row, index) => (
                        <Row key={index} row={row} deleteAction={(task) => props.onDelete(task)} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
