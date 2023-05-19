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
    usertype:"standard"
  })

  const [password2, setTempPassword2] = useState("")

  const{name, username, email, password, usertype} = user

  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

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
              Name:
            </label>
            <input type='text'
            className='form-control' 
            placeholder='Enter your name...'
            name='name'
            value={name}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Username' className='form-label'>
              Username:
            </label>
            <input type='text'
            className='form-control' 
            placeholder='Enter your username...'
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
            placeholder='Enter your e-mail...'
            name='email'
            value={email}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Password' className='form-label'>
              Password:
            </label>
            <input type='password'
            className='form-control' 
            placeholder='Enter your password...'
            name='password'
            value={password}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='PasswordConfirm' className='form-label'>
            Repeat Password:
            </label>
            <input type='password'
            className='form-control' 
            placeholder='Enter your password...'
            name='password2'
            value={password2}
            onChange={(e) => setTempPassword2(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary' > Zarejestruj się </button>
          <Link className='btn btn-danger' to="/" > Anuluj </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
