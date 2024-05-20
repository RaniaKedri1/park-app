import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';

const CreateUser = () => {
  const [info, setInfo] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (info.password !== info.repeatPassword) {
        setError('Passwords do not match.');
        return;
      }
      const response = await axios.post('http://localhost:5000/api/user/register', info);
      // Handle successful register response here, e.g., redirect to login page
      if (response) {
        navigate('/uder/userTable');
      }
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle registration error
      setError(error.response.data.message);
    }
  };

  return (
    <div className="app-container">
      <SideBar />
      <div className='products-area-wrapper tableView' style={{ color: "#222", height: "660px" }}>
        <h1 style={{ margin: "20px" }}>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Email:</label>
            <input type="text" className="form-control" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Password:</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Repeat Password:</label>
            <input type="password" className="form-control" name="repeatPassword" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>First Name:</label>
            <input type="text" className="form-control" name="firstname" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Last Name:</label>
            <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Address:</label>
            <input type="text" className="form-control" name="address" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Tel:</label>
            <input type="text" className="form-control" name="Tel" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Pays:</label>
            <input type="text" className="form-control" name="pays" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>City:</label>
            <input type="text" className="form-control" name="city" onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <label>Postal Code:</label>
            <input type="text" className="form-control" name="postalCode" onChange={handleChange} required />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ margin: "20px" }} className="btn btn-primary">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
