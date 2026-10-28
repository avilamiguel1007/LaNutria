
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard como página inicial */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Páginas secundarias */}
        <Route path="/reportes" element={<Reportes />} />

        <Route
          path="/placeholder"
          element={<Placeholder title="Placeholder Page" />}
        />

        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />

        {/* Redirigir rutas desconocidas */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
