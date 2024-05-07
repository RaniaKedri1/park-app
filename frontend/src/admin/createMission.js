import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';


const CreateM = () => {
  const navigate = useNavigate();
  const [newM, setNewM] = useState({});

  const handleChange = (e) => {
    setNewM({
      ...newM,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   const voitureId = axios.get('http')
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/api/mission/register/${voitureId}`, newM);
      navigate('/admin/Mission');

    } catch (error) {
      console.error('Error creating mission:', error);
    }
  };

  return (
    <div className="app-container">
      <SideBar />
      <div className='products-area-wrapper tableView' style={{ color: "#222", height: "660px" }}>
        <h1 style={{ margin: "20" }}  >Add Mission</h1>
        <div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>dateDepart:</label>
            <input type="date" className="form-control" name="dateDepart" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>dateArrive:</label>
            <input type="date" className="form-control" name="dateArrive" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>image:</label>
            <input type="text" className="form-control" name="image" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>is_verified:</label>
            <select className="form-control" name="is_verified" onChange={handleChange} required>
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>vehicle:</label>
            <input type="text" className="form-control" name="vehicle" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>user:</label>
            <input type="text" className="form-control" name="user" onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" style={{ margin: "20px" }} onClick={handleSubmit} className="btn btn-primary">Add Mission</button>
      </div>
    </div>
  );
};
export default CreateM;