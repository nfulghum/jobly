import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import JoblyApi from '../api';
import LoadingSpinner from './LoadingSpinner';
import JobCardList from './JobCardList';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const JobList = () => {

    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner />;

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid display="flex" justifyContent="center" >
                <SearchForm searchFor={search} />
            </Grid>
            <JobCardList jobs={jobs} />
        </ThemeProvider>
    )
}

export default JobList;