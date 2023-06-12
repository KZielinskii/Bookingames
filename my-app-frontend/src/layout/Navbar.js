import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './navbar_logo.png';

export default function Navbar() {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem('login'));
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('usertype') === 'admin');

  useEffect(() => {
    setIsLogged(sessionStorage.getItem('login'));
    setIsAdmin(sessionStorage.getItem('usertype') === 'admin');
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="Bookingames" /> {/* Wyświetl obrazek jako logo */}
          </Link>
          <div className="ms-auto">
            {isLogged ? (
              <>
                {isAdmin ? (
                  <Link className="btn btn-outline-light me-2" to="/admin">
                    Panel administratora
                  </Link>
                ) : null}
                <Link className="btn btn-outline-light me-2" to="/logout">
                  Wyloguj się
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/">
                  Zaloguj się
                </Link>
                <Link className="btn btn-outline-light" to="/adduser">
                  Zarejestruj się
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
