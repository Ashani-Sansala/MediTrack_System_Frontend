import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import VideoFeed from './VideoFeed';
import ManageUserAccount from './ManageUserAccount';
import ManageEquipment from './ManageEquipment';
import './App.css'; // Already imported here

function App() {
  return (
    <Router>
      <div className="App">
        <div className="above-4cm">
          
          
          {/* Content above navigation bar goes here */}
        </div>
        <nav>
          <ul>
            <li><NavLink exact="true" to="/">Dashboard</NavLink></li>
            <li><NavLink to="/video-feed">Video Feed</NavLink></li>
            <li><NavLink to="/manage-user-account">Manage User Account</NavLink></li>
            <li><NavLink to="/manage-equipment">Manage Equipment</NavLink></li>
          </ul>
        </nav>
        <div className="below-4cm">
          
          
          {/* Content below navigation bar goes here */}
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/video-feed" element={<VideoFeed />} />
            <Route path="/manage-user-account" element={<ManageUserAccount />} />
            <Route path="/manage-equipment" element={<ManageEquipment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
