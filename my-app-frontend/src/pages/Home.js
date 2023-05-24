import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

export default function Home() {
    
    let navigate=useNavigate()
    const username = sessionStorage.getItem('username');
    const usertype = sessionStorage.getItem('usertype');
    const isLogged = sessionStorage.getItem('login');

    console.log(isLogged);

  
   
  }
  