import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem('login'));

  useEffect(() => {
    setIsLogged(sessionStorage.getItem('login'));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Bookingames
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="ms-auto">
            {isLogged ? (
              <Link className="btn btn-outline-light me-2" to="/logout">
                Wyloguj się
              </Link>
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
