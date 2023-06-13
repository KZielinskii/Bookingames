import React, { useEffect, useState, option } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const user_id = sessionStorage.getItem('user_id');

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

  const isOwner = (commentUserId) => {
    return commentUserId == user_id;
  };

  const editComment = async (commentId) => {
    try {
      const response = await axios.put(`http://localhost:8080/opinion/${commentId}/${editedRating}/${editedComment}`);
      console.log(`Successfully edited comment with ID ${commentId}`);
      console.log('Edited comment:', editedComment);
      console.log('Edited rating:', editedRating);
  
      loadOpinions();
    } catch (error) {
      console.error(error);
    }
  };
  

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [editedRating, setEditedRating] = useState(0);

  const handleEditComment = (comment) => {
    const commentId = comment.id;
    setEditedComment(comment.comment);
    setEditedRating(comment.rating);
    setEditingCommentId(commentId);
  };

  const handleSaveComment = (commentId) => {
    editComment(commentId);
    console.log('id:', commentId);
    console.log('Edited comment:', editedComment);
    console.log('Edited rating:', editedRating);

    setEditingCommentId(null);
    setEditedComment('');
    setEditedRating(0);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='col-md-10 offset-md-1 border rounded p-4 mt-2 shadow'>
      <div className='container'>
        <div className='py-4'>
          <div className='py-4'>
            <h1>
              <strong>Login:</strong> {user.username}
            </h1>
          </div>
          <div className='py-1'>
            <h4>
              <strong>Imie:</strong> {user.name}
            </h4>
          </div>
          <div className='py-1'>
            <h4 style={{ borderBottom: '1px solid black', padding: '10px 0' }}>
              <strong>Email:</strong> {user.email}
            </h4>
          </div>
          <div style={{ textAlign: 'left' }} className='py-4'>
            <h2>Opinie:</h2>
          </div>

          {opinions.map((opinion) => (
            <div
              key={opinion.id}
              style={{
                border: '1px solid black',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <p>
                <strong>Ocena:</strong>
                {editingCommentId === opinion.id ? (
                  <select
                    value={editedRating}
                    onChange={(e) => setEditedRating(Number(e.target.value))}
                    className="form-control"
                    style={{textAlign: 'center'}}
                  >
                    <option value="">Wybierz ocenę</option>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                  </select>
                ) : (
                  renderStars(opinion.rating)
                )}
              </p>
              <div className="row">
                <div>
                  <div style={{ textAlign: 'left' }}>
                    <p>
                      <strong>Komentarz:</strong>
                    </p>
                    {editingCommentId === opinion.id ? (
                      <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        className="form-control"
                      />
                    ) : (
                      <p>{opinion.comment}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                    <p>
                      <Link to={`/profile/${opinion.user.id}`}>{opinion.user.username}</Link>
                    </p>
                    {isOwner(opinion.user.id) && (
                      <div>
                        {editingCommentId === opinion.id ? (
                          <div>
                            <button onClick={() => handleSaveComment(opinion.id)} className="btn btn-primary mx-2 my-2">
                              Zapisz
                            </button>
                            <button onClick={() => setEditingCommentId(null)} className="btn btn-secondary mx-2 my-2">
                              Anuluj
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditComment(opinion)}
                            className="btn btn-outline-primary mx-2 my-2"
                          >
                            Edytuj
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
