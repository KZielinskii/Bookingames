import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    loadGameDetails();
  }, []);

  const loadGameDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/game/${id}`);
      setGame(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('pl-PL', options).replace(', ', ' ');
  };

  const renderStars = (level) => {
    const stars = [];
    level = level / 1000;
    if (level === 0) {
      return <span>🌱</span>;
    }
    for (let i = 0; i < level; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };
  

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
    <div className="container">
      <div className="py-4">
        <h1 style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>{game.name}</h1>
        <div>
          <p>
            <strong>Zajęte miejsca:</strong> {game.occupied}/{game.capacity}
          </p>
          <p>
            <strong>Data i godzina:</strong> {formatDateTime(game.datetime)}
          </p>
          <p>
            <strong>Poziom:</strong> 
            {game.level === "BEGINNER" && " Początkujący"}
            {game.level === "AMATEUR" && " Amator"}
            {game.level === "PROFESSIONAL" && " Zawodowiec"}
            {game.level === "MASTER" && " Mistrz"}
          </p>
          <p>
            <strong>Miejscowość:</strong> {game.locality.name}
          </p>
          <p>
            <strong>Organizator:</strong> {game.appUser.username}
          </p>
          <p>
            <strong>Poziom organizatora:</strong> {renderStars(game.appUser.level)}
          </p>
          <h3>Lista użytkowników:</h3>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Username</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Email</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Poziom zawodnika</th>
              </tr>
            </thead>
            <tbody>
              {game.appUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                    <Link to={`/profile/${user.id}`}>{user.username}</Link>
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.email}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{renderStars(user.level)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
