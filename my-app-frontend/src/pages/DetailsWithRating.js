import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function DetailsWithRating() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [ratings, setRatings] = useState({});

  const user_id = sessionStorage.getItem('user_id');

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

  const handleRatingChange = (userId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [userId]: {
        ...(prevRatings[userId] || {}),
        rating,
      },
    }));
  };
  
  const handleCommentChange = (userId, comment) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [userId]: {
        ...(prevRatings[userId] || {}),
        rating: prevRatings[userId]?.rating || '',
        comment,
      },
    }));
  };

  const handleSaveOpinion = async (userId) => {
    const rating = ratings[userId];
    const opinion = rating.rating;
    const comment = rating.comment || '';
    try {
      await axios.post(`http://localhost:8080/opinion/${opinion}/${comment}/${user_id}/${userId}`);
      alert("Pomyślnie dodano opinie!");
    } catch (error) {
      console.error('Błąd podczas zapisywania opinii', error);
      alert("Nie możesz dodać opini użytkownikowi, któremu już wystawiałeś opinie!");
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className='col-md-10 offset-md-1 border rounded p-4 mt-2 shadow'>
      <div className="container">
        <div className="py-4">
          <h1 style={{ fontWeight: 'bold', borderBottom: '1px solid black', padding: '10px 0' }}>{game.name}</h1>
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
                  <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Oceń zawodnika</th>
                </tr>
              </thead>
              <tbody>
              {game.appUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                    <Link to={`/profile/${user.id}`}>{user.username}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">{user.name}</td>
                  <td className="border px-4 py-2 text-center">{user.email}</td>
                  <td className="border px-4 py-2 text-center">{renderStars(user.level)}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="d-flex flex-column align-items-center">
                      <select
                        className="form-select mb-2"
                        value={ratings[user.id]?.rating || ''}
                        onChange={(e) => handleRatingChange(user.id, e.target.value)}
                      >
                        <option value="">Wybierz ocenę</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                      </select>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Wpisz opinię..."
                        value={ratings[user.id]?.comment || ''}
                        onChange={(e) => handleCommentChange(user.id, e.target.value)}
                      />
                       <button
                          className="btn btn-outline-primary"
                          onClick={() => handleSaveOpinion(user.id)}
                        >
                        Zapisz
                      </button>
                    </div>
                  </td>
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
