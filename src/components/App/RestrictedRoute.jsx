import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthenticated } from 'redux/auth/auth.selectors';
import { HOME_ROUTE } from 'components/constants/routes';

const RestrictedRoute = ({ children, navigateTo = HOME_ROUTE }) => {
  const authenticated = useSelector(selectAuthenticated);
  return authenticated ? <Navigate to={navigateTo} replace={true} /> : children;
};

export default RestrictedRoute;
