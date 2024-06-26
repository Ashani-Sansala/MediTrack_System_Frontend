import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/LandingPageButton.scss';

const LandimgPageButton = ({ to, children, onClick, isActive }) => {
  return (
      <Link
          to={to}
          className={`landing_page_button ${isActive ? 'active' : ''}`}
          onClick={onClick}
      >
        {children}
      </Link>
  );
};

LandimgPageButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default LandimgPageButton;