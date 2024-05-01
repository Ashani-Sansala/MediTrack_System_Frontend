
import '../../styles/NavBar.css'; // Update import path for CSS file
import NavBarButton from './NavBarButton';
import {useState} from "react"; // Update import path for NavBarButton component

const NavBar = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonId) => {
        setActiveButton(buttonId); // Set the active button when clicked
    };

    return (
        <div className="navBar">
            <div className="navButton">
                <NavBarButton
                    to="/signin/Dashboard"
                    onClick={() => handleClick('dashboard')}
                    isActive={activeButton === 'dashboard'}
                >
                    Dashboard
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/signin/VideoFeed"
                    onClick={() => handleClick('videoFeed')}
                    isActive={activeButton === 'videoFeed'}
                >
                    Video Feed
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/signin/ManageUsers"
                    onClick={() => handleClick('manageUsers')}
                    isActive={activeButton === 'manageUsers'}
                >
                    Manage User Account
                </NavBarButton>
            </div>
            <div className="navButton">
                <NavBarButton
                    to="/signin/ManageCamera"
                    onClick={() => handleClick('manageCamera')}
                    isActive={activeButton === 'manageCamera'}
                >
                    Manage Camera
                </NavBarButton>
            </div>
        </div>
    );
};

export default NavBar;