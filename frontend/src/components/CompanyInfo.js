import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobCardList from './JobCardList';
import LoadingSpinner from './LoadingSpinner';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CompanyInfo = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobsForUser() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle))
        }
        getCompany();
    }, [handle]);

    if (!company) return <LoadingSpinner />;

    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    gutterBottom
                >
                    {company.name}
                </Typography>
                <Typography variant="h5" align="center" paragraph>
                    {company.description}
                </Typography>
                <JobCardList jobs={company.jobs} />
            </Container>
        </ThemeProvider>
    )
}

export default CompanyInfo;
