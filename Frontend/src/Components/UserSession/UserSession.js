
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserSession() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem('usuario') || 'null'
  );

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    navigate('/login', { replace: true });
  };

  if (!usuario) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '12px 20px',
      background: '#ffffff',
      borderRadius: '10px'
    }}>

      <div>
        <strong>{usuario.nombre}</strong>

        <div style={{
          fontSize: '12px',
          color: '#64748b'
        }}>
          {usuario.email}
        </div>

        <span style={{
          display: 'inline-block',
          marginTop: '5px',
          padding: '4px 9px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          color: '#ffffff',
          background:
            usuario.rol === 'superusuario'
              ? '#7c3aed'
              : '#2563eb'
        }}>
          {usuario.rol === 'superusuario'
            ? 'SUPERUSUARIO'
            : 'USUARIO'}
        </span>
      </div>

      <button
        onClick={cerrarSesion}
        style={{
          padding: '9px 14px',
          border: 'none',
          borderRadius: '7px',
          background: '#dc2626',
          color: '#ffffff',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>

    </div>
  );
}

export default UserSession;
