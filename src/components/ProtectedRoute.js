import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login"/>;
}

export default ProtectedRoute;