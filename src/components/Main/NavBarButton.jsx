import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types'; 
import '../../styles/NavBarButton.scss'; 

const NavBarButton = ({ to, children, onClick, isActive }) => {
  return (
    <Link
      to={to} // Destination path
      className={`nav_bar_button ${isActive ? 'active' : ''}`} // Adding active class if isActive is true
      onClick={onClick} // Click handler
    >
      {children} {/* Button content */}
    </Link>
  );
};

// Prop type validation
NavBarButton.propTypes = {
  to: PropTypes.string.isRequired, // Destination path is required
  children: PropTypes.node.isRequired, // Button content is required
  onClick: PropTypes.func, // Optional click handler
  isActive: PropTypes.bool, // Optional active state
};

export default NavBarButton; 
