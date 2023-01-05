import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import LoadingSpinner from './LoadingSpinner';
import SearchForm from './SearchForm';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';


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

    // console.log(companies)
    return (
        <ThemeProvider>
            <Grid display="flex" justifyContent="center" alignItems="center">
                <SearchForm searchFor={search} />
            </Grid>
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
        </ThemeProvider>
    )
}

export default CompanyList;