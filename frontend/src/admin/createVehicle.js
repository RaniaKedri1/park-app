import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';


const CreateV = () => {
  const navigate = useNavigate();
  const [newV, setNewV] = useState({});

  const handleChange = (e) => {
    setNewV({
      ...newV,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/vehicle/create', newV);
      navigate('/admin/Dashboard');
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };
  return (
    <div className="app-container">
      <SideBar />
      <div className='products-area-wrapper tableView' style={{ color: "#222", height: "660px" }}>
        <h1 style={{ margin: "20" }}  >Add Vehicle</h1>
        <div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Marque:</label>
            <input type="text" className="form-control" name="make" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Modèle:</label>
            <input type="text" className="form-control" name="model" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Année:</label>
            <input type="number" className="form-control" min="2024" max="2084" name="year" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Mileage:</label>
            <input type="number" className="form-control" name="mileage" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>FuelType:</label>
            <input type="text" className="form-control" name="fuelType" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Couleur:</label>
            <input type="text" className="form-control" name="color" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Vin:</label>
            <input type="text" className="form-control" name="vin" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>RegistrationNumber:</label>
            <input type="text" className="form-control" name="registrationNumber" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Status:</label>
            <select className="form-control" name="status" onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <button type="submit" style={{ margin: "20px" }} onClick={handleSubmit} className="btn btn-primary">Add Vehicle</button>
        </div>
      </div>
    </div>
  );
};

export default CreateV;
