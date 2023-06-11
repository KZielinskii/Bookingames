import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import bcrypt from 'bcryptjs'

export default function AddUser() {

  let navigate=useNavigate()

  const [user,setUser]=useState({
    name:"",
    username:"",
    email:"",
    password:"",
    usertype:"standard",
    level: 0
  })

  const [password2, setTempPassword2] = useState("")

  const{name, username, email, password, usertype} = user

  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const checkUsernameExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/username/${username}`);
      const existingUser = response.data;
      return !!existingUser;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const checkEmailExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/email/${email}`);
      const existingUser = response.data;
      return !!existingUser;
    } catch (error) {
      console.error('Error checking emial:', error);
      return false;
    }
  };

  const onSubmit=async(e)=>{
    e.preventDefault();
    if(!name || !username || !email || !password)
    {
      alert("Nie wprowadzono wszystkich danych!")
      return
    }
    if(password !== password2)
    {
      alert("Nie wprowadzono tego samego hasła!")
      return
    }
    const usernameExists = await checkUsernameExists();
    if (usernameExists) {
      alert('Podany login jest już zajęty!');
      return;
    }
    const emailExists = await checkEmailExists();
    if (emailExists) {
      alert('Podany email jest już zajęty!');
      return;
    }

    const saltRounds = 10; // Liczba rund solenia
    const salt = bcrypt.genSaltSync(saltRounds); // Generowanie soli
    const hashedPassword = bcrypt.hashSync(password, salt); // Haszowanie hasła z solą
    const newUser = { ...user, password: hashedPassword };
    
    
    await axios.post("http://localhost:8080/user",newUser)
    navigate("/")
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Zarejestruj się:</h2>

          <form onSubmit={(e)=>onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='Name' className='form-label'>
              Imię:
            </label>
            <input type='text'
            className='form-control' 
            placeholder='Wprowadź swoje imię...'
            name='name'
            value={name}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Username' className='form-label'>
              Login:
            </label>
            <input type='text'
            className='form-control' 
            placeholder='Wprowadź swój login...'
            name='username' value={username}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Email' className='form-label'>
              E-mail:
            </label>
            <input type='text'
            className='form-control' 
            placeholder='Wprowadź swój e-mail...'
            name='email'
            value={email}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Password' className='form-label'>
              Hasło:
            </label>
            <input type='password'
            className='form-control' 
            placeholder='Wprowadź hasło...'
            name='password'
            value={password}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='PasswordConfirm' className='form-label'>
            Powótrz hasło:
            </label>
            <input type='password'
            className='form-control' 
            placeholder='Powótrz hasło...'
            name='password2'
            value={password2}
            onChange={(e) => setTempPassword2(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary mx-2' > Zarejestruj się </button>
          <Link className='btn btn-danger mx-2' to="/" > Anuluj </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
