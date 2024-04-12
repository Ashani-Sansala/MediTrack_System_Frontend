import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../CSS_File/Nav_Bar_Button.css'; // Import CSS file for styling

const Nav_Bar_Button = ({ to, children, className }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        // Call the onClick handler if provided
        // if (onClick) {
        //     onClick();
        // }
    };

    return (
        <Link to={to} className={`nav_bar_button ${className} ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default Nav_Bar_Button;
