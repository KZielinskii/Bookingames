import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditGame() {
  let navigate = useNavigate()

  const usertype = sessionStorage.getItem('usertype');

  let { id } = useParams()

  const [game, setGame] = useState({
    name: '',
    capacity: '',
    occupied: '',
    datetime: '',
    transferredId: '',
    level: ''
  })

  const [localities, setLocalities] = useState([])

  useEffect(() => {
    fetchGame()
    fetchLocalities()
  }, [])

  const fetchGame = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/game/${id}`)
      setGame(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchLocalities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/localities')
      setLocalities(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const onInputChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value })
  }

  const onSelectChange = (e) => {
    setGame({ ...game, transferredId: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!game.name || !game.capacity || !game.datetime || !game.transferredId || !game.level) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/game/${id}`, game);
      navigate('/manageGames');
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edytuj grę:</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Nazwa gry:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Wprowadź nazwę gry...'
                name='name'
                value={game.name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='capacity' className='form-label'>
                Pojemność:
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Wprowadź pojemność...'
                name='capacity'
                min='0'
                value={game.capacity}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='datetime' className='form-label'>
                Data i godzina:
              </label>
              <input
                type='datetime-local'
                className='form-control'
                id='datetime'
                name='datetime'
                min={new Date().toISOString().slice(0, 16)}
                value={game.datetime}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='locality' className='form-label'>
                Lokalizacja:
              </label>
              <select
                className='form-control'
                id='locality'
                name='localityId'
                value={game.transferredId}
                onChange={(e) => onSelectChange(e)}
              >
                <option value=''>Wybierz lokalizację...</option>
                {localities.map((locality) => (
                  <option key={locality.id} value={locality.id}>
                    {locality.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label htmlFor='level' className='form-label'>
                Poziom rozgrywek:
              </label>
              <select
                className='form-control'
                id='level'
                name='level'
                value={game.level}
                onChange={(e) => onInputChange(e)}
              >
                <option value=''>Wybierz poziom rozgrywek...</option>
                <option value='BEGINNER'>Początkujący</option>
                <option value='AMATEUR'>Amator</option>
                <option value='PROFESSIONAL'>Zawodowiec</option>
                <option value='MASTER'>Mistrz</option>
              </select>
            </div>

            <button type='submit' className='btn btn-primary mx-2'>
              Zapisz
            </button>
            <Link className='btn btn-danger mx-2' to='/manageGames'>
              Anuluj
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
