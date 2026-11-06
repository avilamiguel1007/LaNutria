
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const opcionesMenu = [
  { nombre: 'Dashboard', ruta: '/dashboard', icono: 'dashboard' },
  { nombre: 'Productos', ruta: '/productos', icono: 'products' },
  { nombre: 'Clientes', ruta: '/clientes', icono: 'clients' },
  { nombre: 'Reportes', ruta: '/reportes', icono: 'reports' },
  {
    nombre: 'Configuración',
    ruta: '/configuracion',
    icono: 'settings',
  },
];

function Sidebar() {
  return (
    <aside className="nutria-sidebar">

      <nav
        className="nutria-menu"
        aria-label="Navegación principal"
      >

        {opcionesMenu.map((opcion) => (
          <NavLink
            key={opcion.ruta}
            to={opcion.ruta}
            className={({ isActive }) =>
              `nutria-menu-item ${
                isActive ? 'nutria-menu-active' : ''
              }`
            }
          >
            

            <span>{opcion.nombre}</span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;
