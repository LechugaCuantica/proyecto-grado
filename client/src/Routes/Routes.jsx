import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginApp from '../Feature/auth/Login';
import RegisterApp from '../Feature/auth/Register';
import Users from '../pages/Users';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginApp />} />
            <Route path="/register" element={<RegisterApp />} />
            <Route path="/dashboard" element={<Users />} />
        </Routes>
    );
}

export default RoutesApp;
