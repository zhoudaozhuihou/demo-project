import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute component for handling route protection
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string|string[]} [props.requiredRoles] - Required role(s) for access
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @param {Function} props.hasRole - Function to check if user has required role
 */
export const ProtectedRoute = ({ 
  children, 
  requiredRoles,
  isAuthenticated,
  hasRole
}) => {
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are required, check if user has the required role
  if (requiredRoles && !hasRole(requiredRoles)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required roles (if any), render children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  isAuthenticated: PropTypes.bool.isRequired,
  hasRole: PropTypes.func.isRequired
};

export default ProtectedRoute; 