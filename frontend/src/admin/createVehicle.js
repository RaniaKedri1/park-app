import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';


const CreateV = () => {
  const navigate = useNavigate();
  const [newV, setNewV] = useState({});
  const [file, setFile] = useState({});

  const handleChange = (e) => {
    setNewV({
      ...newV,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('make', newV.make);
      formData.append('model', newV.model);
      formData.append('prix', newV.prix);
      formData.append('year', newV.year);
      formData.append('mileage', newV.mileage);
      formData.append('fuelType', newV.fuelType);
      formData.append('color', newV.color);
      formData.append('vin', newV.vin);
      formData.append('registrationNumber', newV.registrationNumber);
      formData.append('file', file);

      await axios.post('http://localhost:5000/api/vehicle/create', formData);
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
            <label>Prix:</label>
            <input type="text" className="form-control" name="prix" onChange={handleChange} required />
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
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Image vehicle:</label>
            <input type="file" className="form-control" name="file" onChange={(e) => setFile(e.target.files[0])} required />                </div>
        </div>
        <button type="submit" style={{ margin: "20px" }} onClick={handleSubmit} className="btn btn-primary">Add Vehicle</button>
      </div>
    </div>
  );
};

export default CreateV;
