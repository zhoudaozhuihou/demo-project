import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../redux/slices/authSlice';
import authService from '../services/authService';

/**
 * ProtectedRoute component for handling route protection
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string|string[]} [props.requiredRoles] - Required role(s) for access
 */
const ProtectedRoute = ({ children, requiredRoles }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are required, check if user has the required role
  if (requiredRoles && !authService.hasRole(requiredRoles)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required roles (if any), render children
  return children;
};

export default ProtectedRoute; 