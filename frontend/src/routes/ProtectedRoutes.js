import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../components/UserContext';

const ProtectedRoute = ({ exact, path }) => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <Route exact={exact} path={path} />
    )
}

export default ProtectedRoute;