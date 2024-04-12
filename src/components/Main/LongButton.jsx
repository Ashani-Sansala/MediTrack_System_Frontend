import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LongButton.css';

const LongButton = ({ to, children, className, onClick }) => {
    const ButtonComponent = to ? Link : 'button';

    return (
        <ButtonComponent to={to} className={`button ${className}`} onClick={onClick}>
            {children}
        </ButtonComponent>
    );
};

export default LongButton;
