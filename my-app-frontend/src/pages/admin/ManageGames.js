import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ManageGames() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const usertype = sessionStorage.getItem('usertype');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const result = await axios.get('http://localhost:8080/games');
    setGames(result.data);
    setFilteredGames(result.data);
  };

  const deleteGame = async (id) => {
    await axios.delete(`http://localhost:8080/game/${id}`);
    loadGames();
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
      return 0;
    });
    setFilteredGames(sorted);
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
      <div className='py-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>Aktualne gry:</h1>
          <Link className='btn btn-primary' to='/addGame'>
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
                <td>{game.datetime}</td>
                <td>{game.locality.name}</td>
                <td>
                  <button className='btn btn-primary mx-2'>
                    <Link to={`/editGame/${game.id}`} className='text-white'>
                      Edytuj
                    </Link>
                  </button>
                  <button className='btn btn-danger mx-2' onClick={() => deleteGame(game.id)}>
                    Usuń
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
