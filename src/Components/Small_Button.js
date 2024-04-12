import React from 'react';
import '../CSS_File/Small_Button.css';

const Button = ({ onClick, children, className }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
