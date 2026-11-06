
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  // Comprobar si existe una sesión
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Iniciar sesión mediante el backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const usuario = formData.get('usuario');
    const password = formData.get('password');

    try {
      const respuesta = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario,
            password,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        alert(datos.mensaje || 'Error al iniciar sesión');
        return;
      }

      localStorage.setItem('token', 'sesion_activa');
      localStorage.setItem('usuario', JSON.stringify(datos.usuario));

      console.log('Inicio de sesión exitoso:', datos.usuario);

      navigate('/dashboard', { replace: true });

    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  // Autenticación de Google (pendiente de implementar)
  const handleGoogleLogin = () => {
    console.log('Iniciar autenticación con Google');
  };

  return (
    <div className="login-wrapper">

      {/* =================================
          ENCABEZADO Y NAVEGACIÓN
      ================================= */}

      <header className="login-header">

        {/* Logotipo */}

        <a href="#inicio" className="login-brand">
          <img
            src="/IconoNutri.ico"
            alt="Logotipo de La Nutria"
            className="login-brand-logo"
          />

          <span>La Nutria</span>
        </a>

        {/* Menú de navegación */}

        <nav className="login-nav" aria-label="Navegación principal">

          <a href="#inicio" className="active">
            Inicio
          </a>

          <a href="#planes">
            Planes
          </a>

          <a href="#consejos">
            Consejos
          </a>

          <a href="#nosotros">
            Nosotros
          </a>

          <a href="#contacto">
            Contacto
          </a>

        </nav>

        {/* Perfil */}

        <button
          type="button"
          className="login-profile"
          aria-label="Perfil de usuario"
          title="Perfil"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </button>

      </header>

      {/* =================================
          CONTENIDO PRINCIPAL
      ================================= */}

      <div className="container">

        {/* Tarjeta de inicio de sesión */}

        <div className="login-box">

          <form className="form" onSubmit={handleSubmit}>

            {/* Título */}

            <div className="login-heading">
              <h1 className="header">
                Bienvenido
              </h1>

              <p className="subtitle">
                Inicia sesión para continuar
              </p>
            </div>

            {/* Usuario */}

            <input
              type="text"
              name="usuario"
              placeholder="Usuario o correo electrónico"
              className="input"
              autoComplete="username"
              aria-label="Usuario o correo electrónico"
              required
            />

            {/* Contraseña */}

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input"
              autoComplete="current-password"
              aria-label="Contraseña"
              required
            />

            {/* Botón de acceso */}

            <button
              type="submit"
              className="button sign-in"
            >
              Iniciar sesión
              <span aria-hidden="true"> →</span>
            </button>

            {/* Acceso con Google */}

            <button
              type="button"
              className="button google-sign-in"
              onClick={handleGoogleLogin}
            >
              <svg
                className="icon"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z"
                />
              </svg>

              <span>Continuar con Google</span>
            </button>

            {/* Enlaces inferiores */}

            <div className="footer">

              <p>
                ¿No tienes una cuenta?{' '}
                <a href="/registro" className="link">
                  Regístrate aquí
                </a>
              </p>

              <a
                href="/recuperar-password"
                className="link"
              >
                ¿Olvidaste tu contraseña?
              </a>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;
