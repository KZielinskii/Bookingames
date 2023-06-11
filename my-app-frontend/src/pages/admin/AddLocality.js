import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function AddLocality() {

    let navigate=useNavigate()

    const usertype = sessionStorage.getItem('usertype');

    const [locality,setLocality]=useState({
      name:""
    })

    const onInputChange=(e)=>{
        setLocality({...locality,[e.target.name]:e.target.value})
      }

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/locality",locality)
        navigate("/manageLocations")
      }

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
              <h2 className='text-center m-4'>Dodaj miejscowość:</h2>
    
              <form onSubmit={(e)=>onSubmit(e)}>
              <div className='mb-3'>
                <input type='text'
                className='form-control' 
                placeholder='Wprowadź miejscowość...'
                name='name'
                onChange={(e)=>onInputChange(e)}
                />
              </div>
              <button type='submit' className='btn btn-primary mx-2' > Dodaj </button>
              <Link className='btn btn-danger mx-2' to="/manageLocations" > Anuluj </Link>
              </form>
            </div>
          </div>
        </div>
      )
}