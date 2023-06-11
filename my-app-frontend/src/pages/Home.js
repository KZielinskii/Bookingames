import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const usertype = sessionStorage.getItem('usertype');
  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const result = await axios.get('http://localhost:8080/games');
    setGames(result.data);
    setFilteredGames(result.data);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterGames(e.target.value);
  };

  const filterGames = (searchTerm) => {
    const filtered = games.filter((game) => {
      const { name, occupied, datetime, locality } = game;
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        occupied.toString().includes(searchTerm) ||
        datetime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locality.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredGames(filtered);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortGames(key, direction);
  };
  
  const sortGames = (key, direction) => {
    const sorted = [...filteredGames].sort((a, b) => {
      if (key === 'name') {
        return direction === 'ascending' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (key === 'occupied') {
        return direction === 'ascending' ? a.occupied - b.occupied : b.occupied - a.occupied;
      }
      if (key === 'datetime') {
        return direction === 'ascending'
          ? new Date(a.datetime) - new Date(b.datetime)
          : new Date(b.datetime) - new Date(a.datetime);
      }
      if (key === 'locality') {
        return direction === 'ascending'
          ? a.locality.name.localeCompare(b.locality.name)
          : b.locality.name.localeCompare(a.locality.name);
      }
      if (key === 'level') {
        return direction === 'ascending'
          ? a.level.localeCompare(b.level)
          : b.level.localeCompare(a.level);
      }
      if (key === 'organizer') {
        return direction === 'ascending'
          ? a.appUser.username.localeCompare(b.appUser.username)
          : b.appUser.username.localeCompare(a.appUser.username);
      }
      return 0;
    });
    setFilteredGames(sorted);
  };

  const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('pl-PL', options).replace(', ', ' ');
  };

  if (usertype !== 'admin' && usertype !== 'standard') {
    return (
      <div className='container'>
        <div className='py-4'>
          <h2>Access denied.</h2>
        </div>
      </div>
    );
  }

  function joinToGame(gameid) {
    axios.put(`http://localhost:8080/game/${gameid}/addUser/${user_id}`)
      .then(response => {
        alert("Dołączyłeś do gry!");
      })
      .catch(error => {
        alert("Nie możesz dołączyć do tej gry!");
      });
  }
  

  return (
    <div className='container'>
      <div className='py-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>Aktualne gry:</h1>
          <Link className='btn btn-primary' to='/addGameUser'>
            Dodaj grę
          </Link>
        </div>

        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Wyszukaj...'
            value={search}
            onChange={handleSearch}
          />
        </div>

        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col' onClick={() => requestSort('name')}>
                Nazwa gry {sortConfig.key === 'name' && <i className={`fas fa-sort-${sortConfig.direction}`} />}
              </th>
              <th scope='col' onClick={() => requestSort('occupied')}>
                Aktualna liczba graczy {sortConfig.key === 'occupied' && <i className={`fas fa-sort-${sortConfig.direction}`} />}
              </th>
              <th scope='col'>Pojemność</th>
              <th scope='col' onClick={() => requestSort('datetime')}>
                Data {sortConfig.key === 'datetime' && <i className={`fas fa-sort-${sortConfig.direction}`} />}
              </th>
              <th scope='col' onClick={() => requestSort('locality')}>
                Miejscowość {sortConfig.key === 'locality' && <i className={`fas fa-sort-${sortConfig.direction}`} />}
              </th>
              <th scope='col' onClick={() => requestSort('level')}>
                Poziom rozgrywek {sortConfig.key === 'level' && <i className={`fas fa-sort-${sortConfig.direction}`} />}
              </th>
              <th scope='col' onClick={() => requestSort('organizer')}>
                Organizator {sortConfig.key === 'organizer' && <i className={`fas fa-sort-${sortConfig.direction}`} />}
              </th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{game.name}</td>
                <td>{game.occupied}</td>
                <td>{game.capacity}</td>
                <td>{formatDateTime(game.datetime)}</td>
                <td>{game.locality.name}</td>
                <td>
                  {game.level === "BEGINNER" && "Początkujący"}
                  {game.level === "AMATEUR" && "Amator"}
                  {game.level === "PROFESSIONAL" && "Zawodowiec"}
                  {game.level === "MASTER" && "Mistrz"}
                </td>
                <td>{game.appUser.username}</td>
                <td>
                <button
                  className='btn btn-primary mx-2 my-2'
                  style={{ textDecoration: 'none' }}
                  onClick={() => joinToGame(game.id)}
                >
                  Dołącz do gry
                </button>
                  <button className='btn btn-primary mx-2 my-2' style={{ textDecoration: 'none' }}>
                    <Link to={`/details/${game.id}`} className='text-white' style={{ textDecoration: 'none' }}>
                      Szczegóły
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
