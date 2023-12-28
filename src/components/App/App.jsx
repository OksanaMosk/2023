import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from 'redux/auth/auth.reducer';
import HomePage from 'pages/HomePage/HomePage';
import ContactsPage from 'pages/ContactsPage/ContactsPage';
import AddPage from 'pages/AddPage/AddPage';
import Layout from 'components/Layout/Layout';
import Page404 from 'pages/Page404/Page404';
import Login from 'pages/LoginPage/LoginPage';
import Register from 'pages/RegisterPage/RegisterPage';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import * as ROUTES from '../constants/routes';
import { selectAuthenticated } from 'redux/auth/auth.selectors';

const appRoutes = [
  {
    path: ROUTES.HOME_ROUTE,
    element: (
      <RestrictedRoute>
        <HomePage />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.ADD_ROUTE,
    element: (
      <PrivateRoute>
        <AddPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    element: (
      <RestrictedRoute>
        <Register />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.LOGIN_ROUTE,
    element: (
      <RestrictedRoute>
        <Login />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.ERROR_ROUTE,

    element: (
      <RestrictedRoute>
        <Page404 />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.NOTFOUNDPPAGE_ROUTE,

    element: (
      <RestrictedRoute>
        <NotFoundPage />
      </RestrictedRoute>
    ),
  },
];
export const App = () => {
  const authenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshThunk(authenticated));
  }, [authenticated, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Layout>
  );
};
