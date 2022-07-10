import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GroupTable(props) {
    const { rows } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team Name</TableCell>
                        <TableCell align="right"> Date </TableCell>
                        <TableCell align="right"> Goals </TableCell>
                        <TableCell align="right"> Wins </TableCell>
                        <TableCell align="right"> Losses </TableCell>
                        <TableCell align="right"> Draws </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(rows.entries()).map((key, index) => {
                        let value = key[1];
                        return (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {key[0]}
                                </TableCell>
                                <TableCell align="right">{value.date}</TableCell>
                                <TableCell align="right">{value.goals}</TableCell>
                                <TableCell align="right">{value.wins}</TableCell>
                                <TableCell align="right">{value.loss}</TableCell>
                                <TableCell align="right">{value.draws}</TableCell>
                            </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}