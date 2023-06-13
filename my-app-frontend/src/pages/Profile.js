import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    loadUser();
    loadOpinions();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadOpinions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/opinions/user/${id}`);
      setOpinions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='col-md-10 offset-md-1 border rounded p-4 mt-2 shadow'>
    <div className='container'>
      <div className='py-4'>
        
            <div className='py-4'><h1><strong>Login:</strong> {user.username}</h1></div>
            <div className='py-1'><h4><strong>Imie:</strong> {user.name}</h4></div>
            <div className='py-1'><h4><strong>Email:</strong> {user.email}</h4></div>
            <div style={{ textAlign: 'left' }} className='py-4'> <h2>Opinie:</h2> </div>
            
            {opinions.map((opinion) => (
                <div key={opinion.id} style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                    <p>
                        <strong>Ocena:</strong> {renderStars(opinion.rating)}
                    </p>
                    <div>
                        <div style={{ textAlign: 'left' }}>
                        <p><strong>Komentarz:</strong></p>
                        <p>{opinion.comment}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p>
                            <strong>Wystawił:</strong> <Link to={`/profile/${opinion.user.id}`}>{opinion.user.username}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
      </div>
    </div>
    </div>
  );
}
