import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const usertype = sessionStorage.getItem('usertype');

  if (usertype !== 'admin') {
    return (
      <div className='container'>
        <div className='py-4'>
          <h2>Access denied.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h1>Panel Administratora:</h1>
            <nav>
                <ul className='list-unstyled'>
                <li>
                    <Link className='btn btn-primary my-2 mx-2' to={`/manageUser`}>
                    Zarządzaj użytkownikami
                    </Link>
                </li>
                <li>
                    <Link className='btn btn-primary my-2 mx-2' to={`/manageLocations`}>
                    Zarządzaj miejscowościami
                    </Link>
                </li>
                <li>
                    <Link className='btn btn-primary my-2 mx-2' to={`/manageGames`}>
                    Zarządzaj grami
                    </Link>
                </li>
                </ul>
            </nav>
        </div>
    </div>
  );
}
