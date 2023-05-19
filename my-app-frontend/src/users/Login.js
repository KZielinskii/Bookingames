import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export default function Login() {
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = loginData;


  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const response = await axios.get(`http://localhost:8080/username/${username}`);
    const user = response.data;
  
    if (!user) {
      alert('Nie znaleziono użytkownika!');
      return;
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  
    if (!isPasswordCorrect) {
      alert('Nieprawidłowe hasło!');
      return;
    }
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('login', true);
    sessionStorage.setItem('usertype', user.usertype)
    navigate('/admin');
  };
  

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Zaloguj się:</h2>

          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label htmlFor='Username' className='form-label'>
                Username:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your username...'
                name='username'
                value={username}
                onChange={onInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Password' className='form-label'>
                Password:
              </label>
              <input
                type='password'
                className='form-control'
                placeholder='Enter your password...'
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
