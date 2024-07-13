import React from 'react';
import '../../styles/PopUp.scss'; // Import the CSS for styling the popup

const PopUp = ({ isOpen, onClose, children }) => {
    // If the popup isn't open, don't render anything
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay">
            {/* The main popup container */}
            <div className="popup">
                {/* Button to close the popup */}
                <button className="popup-close" onClick={onClose}>×</button>
                {/* Render any child components passed to the PopUp component */}
                {children}
            </div>
        </div>
    );
};

export default PopUp;
