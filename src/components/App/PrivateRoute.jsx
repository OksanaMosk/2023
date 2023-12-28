import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthenticated } from 'redux/auth/auth.selectors';
import { LOGIN_ROUTE } from 'components/constants/routes';

const PrivateRoute = ({ children, navigateTo = LOGIN_ROUTE }) => {
  const authenticated = useSelector(selectAuthenticated);
  return authenticated ? (
    children
  ) : (
    <Navigate to={navigateTo} replace={false} />
  );
};

export default PrivateRoute;
