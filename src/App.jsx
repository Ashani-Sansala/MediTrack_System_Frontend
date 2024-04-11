import './App.css';
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import {Routes, Route} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout.jsx";
import VideoFeed from "./pages/videoFeed/VideoFeed.jsx"
import ManageEquipment from "./pages/manageEquipment/ManageEquipment.jsx";
import ManageUsers from "./pages/manageUsers/ManageUsers.jsx";
import Layout01 from "./Layout/Layout01/Layout01.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout01/>}>
                <Route path="Dashboard" element={<Dashboard/>}/>
                <Route path="ManageEquipment" element={<ManageEquipment/>}/>
                <Route path="VideoFeed" element={<VideoFeed/>}/>
                <Route path="ManageUsers" element={<ManageUsers/>}/>
            </Route>

            <Route path="/signin" element={<MainLayout/>}>
                <Route path="Dashboard" element={<Dashboard/>}/>
                <Route path="ManageEquipment" element={<ManageEquipment/>}/>
                <Route path="VideoFeed" element={<VideoFeed/>}/>
                <Route path="ManageUsers" element={<ManageUsers/>}/>
            </Route>
        </Routes>

    )
}

