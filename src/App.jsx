import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SecureLS from 'secure-ls'; // Secure local storage library
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import VideoFeed from './pages/videoFeed/VideoFeed.jsx';
import ManageUsers from './pages/manageUsers/ManageUsers.jsx';
import Layout01 from './layouts/Layout01.jsx';
import ManageCamera from './pages/manageCamera/ManageCamera.jsx';
import { Login } from './pages/login/Login.jsx'; 
import useLogout from './components/Logout/Logout.jsx'; 
import HistoricalRecords from './pages/historicalRecords/HistoricalRecords.jsx';
import './App.scss'; 

// Fetch environment variables for category permissions
const admin_cat = import.meta.env.VITE_ADMIN_CAT; // Admin category from environment variables
const hs_cat = import.meta.env.VITE_HS_CAT; // High security category from environment variables

// Initialize secure local storage instance
const ls = new SecureLS({ encodingType: 'aes' });

// Retrieve category from secure local storage
const category = ls.get('category'); // Current user's category

// Component for handling protected routes based on category permissions
function ProtectedRoute({ element, allowedCats }) {
    const logout = useLogout(); // Logout function from custom hook

    // Effect to check if current category is allowed
    useEffect(() => {
        if (!allowedCats.includes(category)) {
            logout(); // Logout user if category is not allowed
        }
    }, [allowedCats, logout, category]);

    return element; // Render the protected route element
}

// Main App component
export default function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Layout01 />}>
                    <Route index element={<Login />} /> {/* Login page */}
                </Route>

                {/* Protected routes with MainLayout */}
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
