import PropTypes from 'prop-types'; // Import PropTypes for props validation
import '../../styles/SmallButton.scss';

const SmallButton = ({ onClick, children, className }) => {
  return (
      <button className={`button ${className}`} onClick={onClick}>
        {children}
      </button>
  );
};

// PropTypes validation for props
SmallButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SmallButton;