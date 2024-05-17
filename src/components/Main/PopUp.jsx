// src/components/Modal/PopUp.jsx

import React from 'react';
import '../../styles/PopUp.scss';

const PopUp = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="popup-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default PopUp;
