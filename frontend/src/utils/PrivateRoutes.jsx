import { Outlet, Navigate } from "react-router-dom";

// import axios from "axios";

const PrivateRoutes = () => {
  console.log(localStorage.getItem('token'));
  return (
    localStorage.getItem('token') ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes;