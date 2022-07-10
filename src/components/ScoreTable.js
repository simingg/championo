import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ScoreTable(props) {
    const { rows } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rank </TableCell>
                        <TableCell align="right"> Name </TableCell>
                        <TableCell align="right"> Score </TableCell>
                        <TableCell align="right"> Goals </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((value, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{value.name}</TableCell>
                                <TableCell align="right">{value.score}</TableCell>
                                <TableCell align="right">{value.goals}</TableCell>
                            </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}