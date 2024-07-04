import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SecureLS from 'secure-ls';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import VideoFeed from './pages/videoFeed/VideoFeed.jsx';
import ManageUsers from './pages/manageUsers/ManageUsers.jsx';
import Layout01 from './layouts/Layout01.jsx';
import ManageCamera from './pages/manageCamera/ManageCamera.jsx';
import { Login } from './pages/login/client/loginPage/Login.jsx';
import useLogout from './components/Logout/Logout.jsx'; 
import HistoricalRecords from './pages/historicalRecords/HistoricalRecords.jsx';
import './App.scss';

const admin_userid = import.meta.env.VITE_ADMIN_USERID;

const ls = new SecureLS({ encodingType: 'aes' });
const pID = ls.get('pID'); 

function ProtectedRoute({ element, allowedPIDs }) {
    const logout = useLogout();

    useEffect(() => {
        if (!allowedPIDs.includes(pID)) {
            logout();
        }
    }, [allowedPIDs, logout, pID]);

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
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="HistoricalRecords" element={<HistoricalRecords />} />
                    <Route path="ManageCamera" element={
                        <ProtectedRoute element={<ManageCamera />} allowedPIDs={[admin_userid]} />
                    } />
                    <Route path="VideoFeed" element={<VideoFeed />} />

                    <Route path="ManageUsers" element={
                        <ProtectedRoute element={<ManageUsers />} allowedPIDs={[admin_userid]} />
                    } />
                    <Route path="VideoFeed" element={<VideoFeed/>}/>

                </Route>
            </Routes>
        </Router>
    );
}
