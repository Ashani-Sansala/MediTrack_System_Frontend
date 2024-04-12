import React, { useState } from 'react';
import '../../styles/NavBar.css'; // Update import path for CSS file
import NavBarButton from './NavBarButton'; // Update import path for NavBarButton component

const NavBar = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonId) => {
        setActiveButton(buttonId); // Set the active button when clicked
    };

    return (
        <div className="navBar">
            <div className="navButton">
                <NavBarButton
                    to="/logged/Dashboard"
                    onClick={() => handleClick('dashboard')}
                    isActive={activeButton === 'dashboard'}
                >
                    Dashboard
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/logged/VideoFeed"
                    onClick={() => handleClick('videoFeed')}
                    isActive={activeButton === 'videoFeed'}
                >
                    Video Feed
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/logged/ManageUsers"
                    onClick={() => handleClick('manageUsers')}
                    isActive={activeButton === 'manageUsers'}
                >
                    Manage User Account
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/logged/ManageEquipment"
                    onClick={() => handleClick('manageEquipment')}
                    isActive={activeButton === 'manageEquipment'}
                >
                    Manage Camera
                </NavBarButton>
            </div>
        </div>
    );
};

export default NavBar;