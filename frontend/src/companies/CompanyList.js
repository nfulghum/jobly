import React, { useEffect, useState } from 'react';
import JoblyApi from '../api'
import CompanyCard from './CompanyCard';
import SearchForm from '../SearchForm';
import LoadingSpinner from '../LoadingSpinner';


/** List of companies
 * 
 *  Returns list of companies from API.
 *  search will filter specific companies and re-load page with results
 * 
 *  route /companies
 */

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

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length
                ? (
                    <div className="CompanyList-list">
                        {companies.map(c => (
                            <CompanyCard
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default CompanyList;