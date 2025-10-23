import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import nbpGet from "../API/nbp";
// import { v4 as uuidv4 } from 'uuid';
import { Container, Typography, Alert } from '@mui/material';
import MoneyCalculator from '../MoneyCalculator';
import { Rate } from "../types"


function createData(
    code: string,
    currency: string,
    mid: number,
) {
    return { code, currency, mid };
}



export default function BasicTable() {
    const [tables, setTables] = useState<Rate[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                var tableA = (await nbpGet("A") as any).data[0];
                var tableB = (await nbpGet("B") as any).data[0];
                var tableC = (await nbpGet("C") as any).data[0];
                var temp = [...tableA.rates, ...tableB.rates, ...tableC.rates];

                temp = temp.filter((row, index, self) => {
                    return index === self.findIndex(t => t.code === row.code);
                });
                setTables(
                    temp
                );
            } catch (error) {
                setError(true);
            }

        }
        fetchData()
    }, []);



    if (!error) {
        return (<Container>
            <MoneyCalculator currencies={tables} />
            <Paper elevation={12} sx={{ m: 2, borderRadius: "8" }}>
                <Typography variant='h2' >Exchange rates against the zloty</Typography>
            </Paper>
            <TableContainer component={Paper} elevation={12}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Mid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tables && tables.map((row: { code: string, currency: string, mid: number }) => (
                            <TableRow
                                key={row.code}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.code}
                                </TableCell>
                                <TableCell align='right'>
                                    {row.currency}
                                </TableCell>
                                <TableCell align="right">{row.mid}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>)
    } else {
        return <Alert severity='error'>Couldn't load the data. check your internet connection</Alert>
    }
}
