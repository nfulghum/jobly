import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CompanyList from '../components/CompanyList';
import CompanyInfo from '../components/CompanyInfo';
import JobList from '../components/JobList';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Home from '../components/Home';
import SignupForm from '../components/Signup';
import ProtectedRoute from './ProtectedRoutes';


const JoblyRoutes = ({ login, signup }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/companies" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
                <Route path="/companies/:handle" element={<ProtectedRoute><CompanyInfo /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}

export default JoblyRoutes;