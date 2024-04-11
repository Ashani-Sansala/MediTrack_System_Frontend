import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NavBarButton.css'; // Update import path for CSS file

const NavBarButton = ({ to, children, onClick, isActive }) => {
    return (
        <Link
            to={to}
            className={`nav_bar_button ${isActive ? 'active' : ''}`}  /* Changed from clicked to active */
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default NavBarButton;