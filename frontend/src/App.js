import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home';
import NavbarExemple from './component/Navbar';
import Dashboard from './admin/Dashboard';
import CreateV from './admin/createVehicle';
import Users from './admin/userTable';
import CreateU from './admin/createUser';
import UpdateVehicle from './admin/UpdateVehicle';
import SideBar from './component/SideBar';
import Vehicle from './pages/Vehicle';
import Mission from './admin/Mission';
import CreateM from './admin/createMission';
import UpdateMission from './admin/UpdateMission';
import MissionDetails from './admin/MissionDetails';
import RegisterMission from './pages/RegisterMission';
import MissionUser from './pages/MissionUser';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarExemple />

        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/createVehicle' element={<CreateV />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/Mission' element={<Mission />} />
          <Route path='/admin/mission/:id' element={<MissionDetails />} />
          {/* <Route path='/Mission/:id' element={<Mission />} /> */}
          <Route path='/createMission' element={<CreateM />} />
          <Route path='/mission/update/:id' element={<UpdateMission />} />

          <Route path='/user/userTable' element={<Users />} />
          <Route path='/createUser' element={<CreateU />} />
          <Route path='/vehicle/update/:id' element={<UpdateVehicle />} />
          <Route element={<SideBar />} />
          <Route path='/vehicle' element={<Vehicle />} />
          <Route path='/mission/:id' element={<RegisterMission />} />
          <Route path='/mission/' element={<MissionUser />} />
          
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
