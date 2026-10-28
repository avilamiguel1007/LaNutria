
import React from 'react';
import styled from 'styled-components';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('Correo:', email);
    console.log('Formulario enviado');
    
    // Aquí puedes integrar la autenticación con tu backend.
    // No envíes contraseñas a la consola en producción.
  };

  const handleGoogleLogin = () => {
    // Aquí puedes integrar la autenticación con Google.
    console.log('Iniciar autenticación con Google');
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="login-box">
          <form className="form" onSubmit={handleSubmit}>
            <div className="logo" aria-hidden="true" />

            <span className="header">Welcome Back!</span>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              autoComplete="email"
              aria-label="Correo electrónico"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              autoComplete="current-password"
              aria-label="Contraseña"
              required
            />

            <button
              type="submit"
              className="button sign-in"
            >
              Sign In
            </button>

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

              <span>Sign in with Google</span>
            </button>

            <p className="footer">
              Don't have an account?{' '}
              <a href="/registro" className="link">
                Sign up, it's free!
              </a>

              <br />

              <a href="/recuperar-password" className="link">
                Forgot password?
              </a>
            </p>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  background: #0f172a;

  .container {
    --form-width: 315px;
    --aspect-ratio: 1.33;
    --login-box-color: #272727;
    --input-color: #3a3a3a;
    --button-color: #373737;
    --footer-color: rgba(255, 255, 255, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background: var(--login-box-color);
    border-radius: 24px;
    width: calc(var(--form-width) + 2px);
    height: calc(var(--form-width) * var(--aspect-ratio) + 2px);
    flex-shrink: 0;

    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 0 8px rgba(255, 255, 255, 0.1),
      0 0 16px rgba(255, 255, 255, 0.08);
  }

  .container::before {
    content: "";
    position: absolute;
    inset: -50%;
    z-index: -1;
    background: conic-gradient(
      from 45deg,
      transparent 75%,
      #ffffff,
      transparent 100%
    );
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .login-box {
    background: var(--login-box-color);
    border-radius: 22px;
    padding: 28px;
    width: var(--form-width);
    height: calc(var(--form-width) * var(--aspect-ratio));
    box-sizing: border-box;
    position: absolute;
    inset: 1px;
    z-index: 1;

    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    box-shadow:
      inset 0 40px 60px -8px rgba(255, 255, 255, 0.12),
      inset 4px 0 12px -6px rgba(255, 255, 255, 0.12),
      inset 0 0 12px -4px rgba(255, 255, 255, 0.12);
  }

  .form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .logo {
    width: 65px;
    height: 65px;
    flex-shrink: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0.2)
    );
    box-shadow:
      8px 8px 16px rgba(0, 0, 0, 0.2),
      -8px -8px 16px rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    border: 2px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .logo::before {
    content: "";
    position: absolute;
    bottom: 10px;
    width: 50%;
    height: 20%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border: 2.5px solid #ffffff;
  }

  .logo::after {
    content: "";
    position: absolute;
    top: 10px;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    border: 2.5px solid #ffffff;
  }

  .header {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding: 6px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 12px;
    background: var(--input-color);
    color: #ffffff;
    outline: none;
    font-size: 14px;
    transition: border-color 0.2s ease;
  }

  .input::placeholder {
    color: #b8b8b8;
  }

  .input:focus {
    border-color: #ffffff;
  }

  .button {
    width: 100%;
    min-height: 40px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: var(--button-color);
    color: #ffffff;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-shadow:
      inset 0 3px 6px -4px rgba(255, 255, 255, 0.6),
      inset 0 -3px 6px -2px rgba(0, 0, 0, 0.8);
  }

  .sign-in {
    margin-top: 5px;
  }

  .google-sign-in {
    flex-shrink: 0;
  }

  .button:hover {
    background: #4a4a4a;
    box-shadow:
      inset 0 3px 6px rgba(255, 255, 255, 0.2),
      inset 0 -3px 6px rgba(0, 0, 0, 0.5),
      0 0 8px rgba(255, 255, 255, 0.05);
  }

  .button:focus-visible,
  .link:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  .icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .footer {
    width: 100%;
    margin: 8px 0 0;
    text-align: left;
    color: var(--footer-color);
    font-size: 12px;
    line-height: 1.8;
  }

  .footer .link {
    position: relative;
    color: var(--footer-color);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer .link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    border-radius: 6px;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  .footer .link:hover {
    color: #ffffff;
  }

  .footer .link:hover::after {
    width: 100%;
  }

  @media (max-width: 400px) {
    .container {
      --form-width: 290px;
    }

    .login-box {
      padding: 24px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .container::before {
      animation: none;
    }
  }
`;

export default Login;
