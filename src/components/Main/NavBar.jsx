import '../../styles/NavBar.scss';
import NavBarButton from './NavBarButton';
import { useLocation } from 'react-router-dom';
import SecureLS from 'secure-ls';
import { useEffect, useState } from 'react';

const admin_userid = import.meta.env.VITE_ADMIN_USERID;

const ls = new SecureLS({ encodingType: 'aes' });
const pID = ls.get('pID'); 

const NavBar = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <div className="navBar">
      <div className="navButton">
        <NavBarButton
          to="/Dashboard"
          onClick={() => setActiveButton('/Dashboard')}
          isActive={activeButton === '/Dashboard'}
        >
          Dashboard
        </NavBarButton>
      </div>
      <div className="navButton">
        <NavBarButton
          to="/VideoFeed"
          onClick={() => setActiveButton('/VideoFeed')}
          isActive={activeButton === '/VideoFeed'}
        >
          Video Feed
        </NavBarButton>
      </div>
      <div className="navButton">
        <NavBarButton
          to="/HistoricalRecords"
          onClick={() => setActiveButton('/HistoricalRecords')}
          isActive={activeButton === '/HistoricalRecords'}
        >
          Historical Records
        </NavBarButton>
      </div>

      {pID === admin_userid && (
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
