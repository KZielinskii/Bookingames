import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {
  let navigate = useNavigate()

  const { id } = useParams()

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    usertype: "",
    level: ""
  })

  const { name, username, email, password, usertype, level } = user

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    loadUser()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8080/user/${id}`, user)
    navigate("/manageUser")
  }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edytuj użytkownika:</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Imie:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Wprowadź imie...'
                name='name'
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Username' className='form-label'>
                Login:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Wprowadź login...'
                name='username'
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Email' className='form-label'>
                E-mail:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Wprowadź e-mail...'
                name='email'
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Usertype' className='form-label'>
                Usertype:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Wprowadź admin lub standard...'
                name='usertype'
                value={usertype}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Level' className='form-label'>
                Poziom:
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Wprowadź poziom...'
                name='level'
                value={level}
                onChange={(e) => onInputChange(e)}
                min={0}
                max={5000}
              />
            </div>
            <button type='submit' className='btn btn-primary mx-2'> Edytuj </button>
            <Link className='btn btn-danger mx-2' to="/manageUser"> Anuluj </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
