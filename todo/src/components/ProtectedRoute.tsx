// src/ProtectedRoute.js
import { FC, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


interface props { }

const ProtectedRoute: FC<props> = ({ }) => {
  const auth = useAuth()
  const isAuthenticated = auth?.user ? true : false

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn" replace />
  );
}

export default memo(ProtectedRoute);
