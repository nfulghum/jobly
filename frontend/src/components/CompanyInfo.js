import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import LoadingSpinner from './LoadingSpinner';

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
        <div className="CompanyInfo">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
        </div>
    )
}

export default CompanyInfo;