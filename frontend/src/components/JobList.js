import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import JoblyApi from '../api';
import LoadingSpinner from './LoadingSpinner';
import JobCardList from './JobCardList';


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
        <div className="JobList">
            <SearchForm searchFor={search} />
            <JobCardList jobs={jobs} />
        </div>
    )
}

export default JobList;