import React, { useState } from 'react'

export default function AddUser() {

  const [user,setUser]=useState({
    name:"",
    username:"",
    email:""
  })

  const{name, username, email} = user

  const onInputChange=(e)=>{
    
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Register</h2>
          <div className='mb-3'>
            <label htmlFor='Name' className='form-label'>
              Name:
            </label>
            <input type='text' className='form-control' 
            placeholder='Enter your name...' name='name' value={name}/>
          </div>
          <div className='mb-3'>
            <label htmlFor='Username' className='form-label'>
              Username:
            </label>
            <input type='text' className='form-control' 
            placeholder='Enter your username...' name='username' value={username}/>
          </div>
          <div className='mb-3'>
            <label htmlFor='Email' className='form-label'>
              E-mail:
            </label>
            <input type='text' className='form-control' 
            placeholder='Enter your e-mail...' name='email' value={email}/>
          </div>
          <button type='submit' className='btn btn-primary' > Zarejestruj się. </button>
          <button type='canccel' className='btn btn-danger' > Anuluj. </button>
        </div>
      </div>
    </div>
  )
}
