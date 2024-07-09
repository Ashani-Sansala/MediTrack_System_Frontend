import '../../styles/NavBar.scss'; 
import NavBarButton from './NavBarButton'; 
import { useLocation } from 'react-router-dom'; 
import SecureLS from 'secure-ls'; 
import { useEffect, useState } from 'react'; 

const admin_cat = import.meta.env.VITE_ADMIN_CAT;

const ls = new SecureLS({ encodingType: 'aes' }); // Initializing SecureLS with AES encryption
const category = ls.get('category'); // Retrieving 'category' from local storage

const NavBar = () => {
  const location = useLocation(); // Using useLocation to get the current path
  const [activeButton, setActiveButton] = useState(null); // State to track the active button

  useEffect(() => {
    setActiveButton(location.pathname); // Update active button state when location changes
  }, [location.pathname]);

  return (
    <div className="navBar">
      {/* Render Dashboard button */}
      <div className="navButton">
        <NavBarButton
          to="/Dashboard"
          onClick={() => setActiveButton('/Dashboard')}
          isActive={activeButton === '/Dashboard'}
        >
          Dashboard
        </NavBarButton>
      </div>
      {/* Render Video Feed button */}
      <div className="navButton">
        <NavBarButton
          to="/VideoFeed"
          onClick={() => setActiveButton('/VideoFeed')}
          isActive={activeButton === '/VideoFeed'}
        >
          Video Feed
        </NavBarButton>
      </div>
      {/* Render Historical Records button */}
      <div className="navButton">
        <NavBarButton
          to="/HistoricalRecords"
          onClick={() => setActiveButton('/HistoricalRecords')}
          isActive={activeButton === '/HistoricalRecords'}
        >
          Historical Records
        </NavBarButton>
      </div>
      {/* Render admin-specific buttons if the user is an admin */}
      {category === admin_cat && (
        <>
          <div className="navButton">
            <NavBarButton
              to="/ManageUsers"
              onClick={() => setActiveButton('/ManageUsers')}
              isActive={activeButton === '/ManageUsers'}
            >
              Manage Users
            </NavBarButton>
          </div>
          <div className="navButton">
            <NavBarButton
              to="/ManageCamera"
              onClick={() => setActiveButton('/ManageCamera')}
              isActive={activeButton === '/ManageCamera'}
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
