import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/LongButton.css';

function LongButton({ to, onClick, children, className }) {
    return (
        <Link to={to} className={`button ${className}`} onClick={onClick}>
            {children}
        </Link>
    );
}

LongButton.propTypes = {
    to: PropTypes.string.isRequired, // Assuming 'to' is required for the Link
    onClick: PropTypes.func, // Optional onClick function
    children: PropTypes.node.isRequired, // Content of the button
    className: PropTypes.string, // Additional class for styling
};

export default LongButton;
