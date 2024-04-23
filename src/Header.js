import React from 'react';
import logo from './logo.png'; // Assuming the logo file is named "logo.png"
import './Header.css'; // Import CSS file for additional styling

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" /> {/* Use the logo image */}
     
      {/* Other header content */}
    </div>
  );
}

export default Header;
