import {
    ThemeProvider,
    Box,
    Card,
    CardActions,
    Button,
    CardContent,
    Typography
} from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';

const JobCard = ({ id, title, salary, equity, companyName }) => {

    return (
        <ThemeProvider>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {companyName}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                            {equity !== undefined && <div><small>Equity: {equity}</small></div>}
                        </Typography>
                        <CardActions>
                            <Button size="small">Apply</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    )
}

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }
    return digitsRev.reverse().join("");
}

export default JobCard;

