import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm';
import LoadingSpinner from '../LoadingSpinner';
import JoblyApi from '../api';
import JobCardList from './JobCardList';

const JobList = () => {

    const [jobs, setJobs] = useState(null);

    useEffect(function getJobsOnMount() {
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner />;

    return (
        <div>
            <SearchForm searchFor={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <p>Sorry, no results were found!</p>
            }
        </div>
    );
}

export default JobList;