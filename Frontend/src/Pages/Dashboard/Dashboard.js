
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';

// ==========================================
// INDICADORES DEL DASHBOARD
// ==========================================

const indicadores = [
  {
    titulo: 'VENTAS',
    valor: '128',
    descripcion: 'Pedidos del mes',
    icono: 'cart',
    color: 'ventas',
  },
  {
    titulo: 'CLIENTES',
    valor: '1,024',
    descripcion: 'Clientes activos',
    icono: 'users',
    color: 'clientes',
  },
  {
    titulo: 'INGRESOS',
    valor: '$8,450',
    descripcion: 'Total del mes',
    icono: 'money',
    color: 'ingresos',
  },
  {
    titulo: 'PRODUCTOS',
    valor: '342',
    descripcion: 'En inventario',
    icono: 'box',
    color: 'productos',
  },
];

// ==========================================
// OPCIONES DEL MENÚ LATERAL
// ==========================================

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

// ==========================================
// COMPONENTE DE ICONOS
// ==========================================

function Icono({ tipo, size = 26 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (tipo) {
    case 'dashboard':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case 'products':
    case 'box':
      return (
        <svg {...props}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 7 9 5 9-5" />
          <path d="M3 7v10l9 5 9-5V7" />
          <path d="M12 12v10" />
        </svg>
      );

    case 'clients':
    case 'users':
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="4" />
          <path d="M2 21v-2a7 7 0 0 1 14 0v2" />
          <path d="M16 4.5a4 4 0 0 1 0 7.5" />
          <path d="M19 14a6 6 0 0 1 3 5v2" />
        </svg>
      );

    case 'reports':
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <rect x="5" y="11" width="4" height="10" rx="1" />
          <rect x="10" y="4" width="4" height="17" rx="1" />
          <rect x="15" y="8" width="4" height="13" rx="1" />
        </svg>
      );

    case 'settings':
      return (
        <svg {...props}>
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-3l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.5-2.6L7 15a8 8 0 0 1 0-2l-1.5-1.1L7 9.3l1.7.6a8 8 0 0 1 1.7-1l.3-1.8h3l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.5 2.6L19.4 13a8 8 0 0 1 0 2Z" />
        </svg>
      );

    case 'cart':
      return (
        <svg {...props}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="19" cy="20" r="1.5" />
          <path d="M2 3h3l3 13h11l3-9H6" />
          <path d="M8 16h11" />
        </svg>
      );

    case 'money':
      return (
        <svg {...props}>
          <path d="M12 2v20" />
          <path d="M17 6.5a5 5 0 0 0-5-2.5c-2.8 0-5 1.4-5 4s2.2 4 5 4 5 1.4 5 4-2.2 4-5 4a5.5 5.5 0 0 1-5-2.5" />
        </svg>
      );

    default:
      return null;
  }
}

// ==========================================
// DASHBOARD PRINCIPAL
// ==========================================

function Dashboard() {
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  // ==========================================
  // RECUPERAR INFORMACIÓN DEL USUARIO
  // ==========================================

  let usuario = null;

  try {
    usuario = JSON.parse(
      localStorage.getItem('usuario') || 'null'
    );
  } catch (error) {
    console.error('Error al recuperar usuario:', error);
  }

  // Obtener datos del usuario autenticado
  const nombre = usuario?.nombre || usuario?.usuario || 'Usuario';
  const correo = usuario?.email || usuario?.correo || '';
  const rol = usuario?.rol?.toLowerCase() || 'usuario';

  // Obtener inicial para el avatar
  const inicial = nombre.charAt(0).toUpperCase();

  // Traducir roles
  const nombreRol = {
    admin: 'ADMINISTRADOR',
    administrador: 'ADMINISTRADOR',
    superusuario: 'SUPERUSUARIO',
    nutriologo: 'NUTRIÓLOGO',
    'nutriólogo': 'NUTRIÓLOGO',
    paciente: 'PACIENTE',
    usuario: 'USUARIO',
  };

  const rolMostrar = nombreRol[rol] || rol.toUpperCase();

  // ==========================================
  // CERRAR MENÚ AL HACER CLIC FUERA
  // ==========================================

  useEffect(() => {
    const cerrarMenuExterno = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener('mousedown', cerrarMenuExterno);

    return () => {
      document.removeEventListener('mousedown', cerrarMenuExterno);
    };
  }, []);

  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    navigate('/login', { replace: true });
  };

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <div className="nutria-app">

      {/* BARRA SUPERIOR */}

      <header className="nutria-navbar">

        <NavLink to="/dashboard" className="nutria-brand">
          <div className="nutria-logo" aria-hidden="true">
            <span>🦦</span>
          </div>

          <span className="nutria-brand-name">
            Nutria
          </span>
        </NavLink>

        {/* MENÚ DESPLEGABLE DEL USUARIO */}

        <div
          className="nutria-navbar-actions"
          ref={menuRef}
        >

          <button
            type="button"
            className="nutria-profile-button"
            aria-label="Abrir menú de usuario"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {inicial}
          </button>

          <button
            type="button"
            className={`nutria-chevron-button ${
              menuAbierto ? 'abierto' : ''
            }`}
            aria-label="Mostrar opciones de usuario"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="nutria-chevron" />
          </button>

          {menuAbierto && (
            <div className="nutria-dropdown">

              {/* INFORMACIÓN DEL USUARIO */}

              <div className="nutria-dropdown-header">

                <div className="nutria-dropdown-avatar">
                  {inicial}
                </div>

                <div className="nutria-dropdown-user">
                  <strong>{nombre}</strong>
                  <span>{correo}</span>
                </div>

                <span className={`nutria-role-badge ${rol}`}>
                  {rolMostrar}
                </span>

              </div>

              <div className="nutria-dropdown-divider" />

              {/* MI PERFIL */}

              <button
                type="button"
                className="nutria-dropdown-item"
                onClick={() => {
                  setMenuAbierto(false);
                  navigate('/perfil');
                }}
              >
                <span>👤</span>
                Mi perfil
              </button>

              {/* CERRAR SESIÓN */}

              <button
                type="button"
                className="nutria-dropdown-item nutria-logout"
                onClick={cerrarSesion}
              >
                <span>↪</span>
                Cerrar sesión
              </button>

            </div>
          )}

        </div>
      </header>

      {/* CUERPO PRINCIPAL */}

      <div className="nutria-body">

        {/* MENÚ LATERAL */}

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

                <Icono tipo={opcion.icono} size={27} />

                <span>{opcion.nombre}</span>

              </NavLink>
            ))}

          </nav>

        </aside>

        {/* CONTENIDO DEL DASHBOARD */}

        <main className="nutria-main">

          <div className="nutria-page-heading">
            <h1>Dashboard</h1>
          </div>

          {/* TARJETAS DE INDICADORES */}

          <section
            className="nutria-stats-grid"
            aria-label="Indicadores principales"
          >

            {indicadores.map((indicador) => (
              <article
                key={indicador.titulo}
                className={`nutria-stat-card ${indicador.color}`}
              >

                <div className="nutria-stat-icon">
                  <Icono tipo={indicador.icono} size={35} />
                </div>

                <div className="nutria-stat-info">

                  <span className="nutria-stat-title">
                    {indicador.titulo}
                  </span>

                  <strong className="nutria-stat-value">
                    {indicador.valor}
                  </strong>

                  <span className="nutria-stat-description">
                    {indicador.descripcion}
                  </span>

                </div>

              </article>
            ))}

          </section>

        </main>

      </div>
    </div>
  );
}

export default Dashboard;
