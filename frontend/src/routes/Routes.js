import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../home/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyInfo from '../companies/CompanyInfo';
import JobList from '../jobs/JobList';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Profile from '../profiles/Profile';




const JoblyRoutes = ({ login, signup }) => {



    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} login={login} />
                <Route path="/signup" element={<Signup />} signup={signup} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/companies/:handle" element={<CompanyInfo />} />
                <Route path="/companies" element={<CompanyList />} />
            </Routes>
        </div>
    )
}

export default JoblyRoutes;