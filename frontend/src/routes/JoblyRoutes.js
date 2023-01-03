import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CompanyList from '../components/CompanyList';
import CompanyInfo from '../components/CompanyInfo';
import JobList from '../components/JobList';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Signup from '../components/Signup';

const JoblyRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/companies/:handle" element={<CompanyInfo />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )
}

export default JoblyRoutes;