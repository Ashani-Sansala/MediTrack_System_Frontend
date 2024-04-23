import React from 'react';
import logoImg from './logo.png'; // Import your logo image

function Logo() {
    return (
        <div className="logo">
            <img src={logoImg} alt="Your Website Logo" />
        </div>
    );
}

export default Logo;
