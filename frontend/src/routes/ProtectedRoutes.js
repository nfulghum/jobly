import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../components/UserContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;