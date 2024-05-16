import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/NavBarButton.scss';

const NavBarButton = ({ to, children, onClick, isActive }) => {
  return (
      <Link
          to={to}
          className={`nav_bar_button ${isActive ? 'active' : ''}`}
          onClick={onClick}
      >
        {children}
      </Link>
  );
};

NavBarButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default NavBarButton;