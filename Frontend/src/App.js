import './App.css';
import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Dashboard from './Pages/Dashboard/Dashboard';
import Reportes from './Pages/Reportes/Reportes';
import Placeholder from './Pages/Placeholder/Placeholder';
import Perfil from './Pages/Perfil/Perfil';
import Configuracion from './Pages/Configuracion/Configuracion';

import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route
            path="/placeholder"
            element={<Placeholder title="Placeholder Page" />}
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;