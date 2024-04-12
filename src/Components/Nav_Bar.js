import React from 'react';
import '../CSS_File/Nav_Bar.css';
import Nav_Bar_Button from "./Nav_Bar_Button";

const Nav_Bar = () => {
    return (
        <div className="nav_bar">
            <div className="nav_button">
                <Nav_Bar_Button to="/dashboard">Dashboard</Nav_Bar_Button>
            </div>
            <div className="nav_button">
                <Nav_Bar_Button to="/Video_Feed">Video Feed</Nav_Bar_Button>
            </div>
            <div className="nav_button">
                <Nav_Bar_Button to="/Manage_User_Account">Manage User Account</Nav_Bar_Button>
            </div>
            <div className="nav_button">
                <Nav_Bar_Button to="/Manage_Equipment">Manage Equipment</Nav_Bar_Button>
            </div>
        </div>
    );
};

export default Nav_Bar;
