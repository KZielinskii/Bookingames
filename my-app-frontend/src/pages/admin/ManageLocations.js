import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function ManageLocations() {
    const [locations, setLocations] = useState([]);
    const usertype = sessionStorage.getItem('usertype');
  
    useEffect(() => {
      loadLocalities();
    }, []);
  
    const loadLocalities = async () => {
      const result = await axios.get('http://localhost:8080/localities');
      setLocations(result.data);
    };
  
    const deleteLocality = async (id) => {
      await axios.delete(`http://localhost:8080/locality/${id}`);
      loadLocalities();
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
            <h1>Miejscowości:</h1>
            <Link className='btn btn-primary' to='/addLocality'>
              Dodaj miejscowość
            </Link>
          </div>

          <table className='table border shadow'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>Miejscowość</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((locality, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{locality.name}</td>
                  <td>
                    <button className='btn btn-danger mx-2' onClick={() => deleteLocality(locality.id)}>
                      Delete
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
  