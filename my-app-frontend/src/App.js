import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import ManageUser from './pages/admin/ManageUser';
import ManageLocations from './pages/admin/ManageLocations';
import ManageGames from './pages/admin/ManageGames';
import Admin from './pages/admin/Admin';
import Home from './pages/Home';
import Details from './pages/Details';
import Completed from './pages/Completed';
import AddLocality from './pages/admin/AddLocality';
import AddGame from './pages/admin/AddGame';
import EditGame from './pages/admin/EditGame';
import AddGameUser from './pages/AddGameUser';
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
          <Route exact path='/manageUser' element={<ManageUser/>}/>
          <Route exact path='/manageLocations' element={<ManageLocations/>}/>
          <Route exact path='/manageGames' element={<ManageGames/>}/>
          <Route exact path='/addLocality' element={<AddLocality/>}/>
          <Route exact path='/addGame' element={<AddGame/>}/>
          <Route exact path='/addGameUser' element={<AddGameUser/>}/>
          <Route exact path="/editGame/:id" element={<EditGame />} />
          
          <Route exact path='/completed' element={<Completed/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/details/:id' element={<Details/>}/>
          <Route exact path='/adduser' element={<AddUser/>}/>
          <Route exact path='/edituser/:id' element={<EditUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
