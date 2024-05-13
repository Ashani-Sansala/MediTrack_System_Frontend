import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import VideoFeed from './pages/videoFeed/VideoFeed.jsx';
import ManageUsers from './pages/manageUsers/ManageUsers.jsx';
import Layout01 from './layouts/Layout01.jsx';
import ManageCamera from './pages/manageCamera/ManageCamera.jsx';
import { Login } from './pages/login/client/loginPage/Login.jsx';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout01 />}>
                    {/* Nested Routes under "/" */}
                    <Route path="/" element={<Login />} />
                </Route>

                <Route path="/signin" element={<MainLayout />}>
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="ManageCamera" element={<ManageCamera />} />
                    <Route path="VideoFeed" element={<VideoFeed />} />
                    <Route path="ManageUsers" element={<ManageUsers />} />
                </Route>
            </Routes>
        </Router>
    );
}
