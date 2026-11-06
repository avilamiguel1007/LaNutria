
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  // Comprobar si existe una sesión
  const token = localStorage.getItem('token');

  // Si no existe sesión, enviar al Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si existe sesión, permitir acceso
  return <Outlet />;
};

export default ProtectedRoute;
