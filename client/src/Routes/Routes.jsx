import { Route, Routes } from 'react-router-dom';
import LoginApp from '../Feature/auth/Login';
import RegisterApp from '../Feature/auth/Register';
import Users from '../pages/Users';
import DashboardLayout from '../Feature/dashboard/Layout/DashboardLayout';
import Dashboard from '../Feature/dashboard/Dashboard';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginApp />} />
            <Route path="/register" element={<RegisterApp />} />


            <Route path="/dashboard" element={<DashboardLayout />} >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
            </Route>


        </Routes>
    );
}

export default RoutesApp;
