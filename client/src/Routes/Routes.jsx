import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginApp from '../Feature/auth/Login';
import RegisterApp from '../Feature/auth/Register';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginApp />} />
            <Route path="/Register" element={<RegisterApp />} />


        </Routes>
    );
}

export default RoutesApp;
