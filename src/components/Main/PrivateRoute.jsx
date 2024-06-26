// PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location, message: "You have to login first." }}
            />
        );
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
