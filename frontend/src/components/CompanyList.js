import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import LoadingSpinner from './LoadingSpinner';
import SearchForm from './SearchForm';

const CompanyList = () => {

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner />;

    console.log(companies)
    return (
        <div className="CompanyList">
            <SearchForm searchFor={search} />
            <div>
                {companies.map(c => (
                    <CompanyCard
                        key={c.handle}
                        handle={c.handle}
                        name={c.name}
                        description={c.description}
                        logoUrl={c.logoUrl}
                        numEmployees={c.numEmployees}
                    />
                ))}
            </div>
        </div>
    )
}

export default CompanyList;