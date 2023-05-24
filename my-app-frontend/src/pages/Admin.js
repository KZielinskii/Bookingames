import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Home() {
    const [users, setUsers] = useState([]);
    const usertype = sessionStorage.getItem('usertype');
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get('http://localhost:8080/users');
      setUsers(result.data);
    };
  
    const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8080/user/${id}`);
      loadUsers();
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
          <table className='table border shadow'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>Name</th>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>Password</th>
                <th scope='col'>Usertype</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.usertype}</td>
                  <td>
                    <Link className='btn btn-outline-primary mx-2' to={`/editUser/${user.id}`}>
                      Edit
                    </Link>
                    <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>
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
  