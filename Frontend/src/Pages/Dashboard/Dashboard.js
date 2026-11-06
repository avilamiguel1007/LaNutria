
import React from 'react';
import './Dashboard.css';

import Topbar from '../../Components/Topbar/Topbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Icono } from '../../Components/Topbar/Topbar';

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
// DASHBOARD PRINCIPAL
// ==========================================

function Dashboard() {
  // Recuperar información del usuario
  let usuario = null;

  try {
    usuario = JSON.parse(
      localStorage.getItem('usuario') || 'null'
    );
  } catch (error) {
    console.error('Error al recuperar usuario:', error);
  }

  return (
    <div className="nutria-app">

      {/* BARRA SUPERIOR */}

      <Topbar usuario={usuario} />

      {/* CUERPO PRINCIPAL */}

      <div className="nutria-body">

        {/* MENÚ LATERAL */}

        <Sidebar />

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
