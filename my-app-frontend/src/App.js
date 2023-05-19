import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/Register';
import EditUser from './users/EditUser';
import Login from './users/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/admin' element={<Home/>}/>
          <Route exact path='/adduser' element={<AddUser/>}/>
          <Route exact path='/edituser/:id' element={<EditUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
