// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import VideoFeed from './pages/videoFeed/VideoFeed.jsx';
import ManageUsers from './pages/manageUsers/ManageUsers.jsx';
import Layout01 from './layouts/Layout01.jsx';
import ManageCamera from './pages/manageCamera/ManageCamera.jsx';
import { Login } from './pages/login/client/loginPage/Login.jsx';
import LandingPage from "./pages/landingPage/landingPage.jsx";
import Layout02 from "./layouts/Layout02.jsx";
import { AuthProvider } from './components/Main/AuthProvider.jsx';
import PrivateRoute from './components/Main/PrivateRoute.jsx';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout02 />}>
                        <Route path="/" element={<LandingPage />} />
                    </Route>
                    <Route path="/" element={<Layout01 />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/signin" element={<MainLayout />}>
                        <Route path="Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="ManageCamera" element={<PrivateRoute><ManageCamera /></PrivateRoute>} />
                        <Route path="VideoFeed" element={<PrivateRoute><VideoFeed /></PrivateRoute>} />
                        <Route path="ManageUsers" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
