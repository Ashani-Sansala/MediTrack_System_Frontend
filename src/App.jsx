import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SecureLS from 'secure-ls';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import VideoFeed from './pages/videoFeed/VideoFeed.jsx';
import ManageUsers from './pages/manageUsers/ManageUsers.jsx';
import Layout01 from './layouts/Layout01.jsx';
import ManageCamera from './pages/manageCamera/ManageCamera.jsx';
import { Login } from './pages/login/Login.jsx';
import useLogout from './components/Logout/Logout.jsx'; 
import HistoricalRecords from './pages/historicalRecords/historicalRecords.jsx';
import './App.scss';

const admin_cat = import.meta.env.VITE_ADMIN_CAT;
const hs_cat = import.meta.env.VITE_HS_CAT

const ls = new SecureLS({ encodingType: 'aes' });
const category = ls.get('category'); 

function ProtectedRoute({ element, allowedCats }) {
    const logout = useLogout();

    useEffect(() => {
        if (!allowedCats.includes(category)) {
            logout();
        }
    }, [allowedCats, logout, category]);

    return element;
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout01 />}>
                    <Route index element={<Login />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                    <Route path="Dashboard" element={
                        <ProtectedRoute element={<Dashboard />} allowedCats={[admin_cat, hs_cat]} />
                    } />
                    <Route path="HistoricalRecords" element={
                        <ProtectedRoute element={<HistoricalRecords />} allowedCats={[admin_cat, hs_cat]} />
                    } />
                    <Route path="ManageCamera" element={
                        <ProtectedRoute element={<ManageCamera />} allowedCats={[admin_cat]} />
                    } />
                    <Route path="VideoFeed" element={
                        <ProtectedRoute element={<VideoFeed />} allowedCats={[admin_cat, hs_cat]} />
                    } />
                    <Route path="ManageUsers" element={
                        <ProtectedRoute element={<ManageUsers />} allowedCats={[admin_cat]} />
                    } />
                </Route>
            </Routes>
        </Router>
    );
}