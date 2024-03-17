import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Video_Feed from './pages/Video_Feed';
import Manage_Equipment from './pages/Manage_Equipment';
import Manage_User_Account from './pages/Manage_User_Account';
import Small_Button from './Components/Small_Button';
import Long_Button from './Components/Long_Button';
import Title_Bar from './Components/Title_Bar';
import Nav_Bar from "./Components/Nav_Bar";

function App() {
    const handleNavButtonClick = () => {
        console.log('Nav_Bar_Button clicked!');
        // Add your Nav_Bar_Button click logic here
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Dashboard" element={<Home />} />
                    <Route path="/Video_Feed" element={<Video_Feed />} />
                    <Route path="/Manage_Equipment" element={<Manage_Equipment />} />
                    <Route path="/Manage_User_Account" element={<Manage_User_Account />} />
                </Routes>

                <Title_Bar />

                <br />

                {/* Nav Bar */}
                <Nav_Bar />
            </div>
        </Router>
    );
}

export default App;
