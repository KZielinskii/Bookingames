import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Admin from './pages/Admin';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/Register';
import EditUser from './users/EditUser';
import Login from './users/Login';
import Logout from './users/Logout';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/logout' element={<Logout/>}/>
          <Route exact path='/admin' element={<Admin/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/adduser' element={<AddUser/>}/>
          <Route exact path='/edituser/:id' element={<EditUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
