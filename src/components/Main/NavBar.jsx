import '../../styles/NavBar.scss';
import NavBarButton from './NavBarButton';
import { useState } from "react";
import SecureLS from 'secure-ls';

const admin_userid = import.meta.env.VITE_ADMIN_USERID;

const ls = new SecureLS({ encodingType: 'aes' });
const pID = ls.get('pID'); 

const NavBar = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonId) => {
        setActiveButton(buttonId); // Set the active button when clicked
    };

    return (
        <div className="navBar">
            <div className="navButton">
                <NavBarButton
                    to="/Dashboard"
                    onClick={() => handleClick('dashboard')}
                    isActive={activeButton === 'dashboard'}
                >
                    Dashboard
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/VideoFeed"
                    onClick={() => handleClick('videoFeed')}
                    isActive={activeButton === 'videoFeed'}
                >
                    Video Feed
                </NavBarButton>
            </div>
            {pID === admin_userid && (
                <>
                    <div className="navButton">
                        <NavBarButton
                            to="/ManageUsers"
                            onClick={() => handleClick('manageUsers')}
                            isActive={activeButton === 'manageUsers'}
                        >
                            Manage User Account
                        </NavBarButton>
                    </div>
                    <div className="navButton">
                        <NavBarButton
                            to="/ManageCamera"
                            onClick={() => handleClick('manageCamera')}
                            isActive={activeButton === 'manageCamera'}
                        >
                            Manage Camera
                        </NavBarButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default NavBar;
