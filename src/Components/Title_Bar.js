import React from 'react';
import '../CSS_File/Title_Bar.css';

const Title_Bar = () => {
    return (
        <div className="title_bar">
            <div className="logo_container">
                <img src='/meditracker.png' alt='Logo'/>
            </div>
                <div className="avatar_name">
                    <div className="name">
                        <div className="greeting">Hi,</div>
                        <div className="user_name">Sahan</div>
                    </div>
                    <div className="avatar">
                        <img src='/profile.jpg' alt='Logo'/>
                    </div>
                </div>
        </div>
    );
};

export default Title_Bar;
