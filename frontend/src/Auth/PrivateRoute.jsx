import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // log the data type to console
  

  return user && user.isAuthenticated;
};

const PrivateRoute = () => {
    const isAuth = useAuth();

    // console.log(isAuth);

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
