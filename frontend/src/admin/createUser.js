import React, { useState } from 'react';

const CreateU = ({ handleAdd }) => {
  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [pays, setPays] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstname,
      lastName,
      email,
      password,
      address,
      pays,
      city,
      postalCode,
      profilePic
    };
    handleAdd(newUser);
    // Clear the form fields after submission
    setFirstname('');
    setLastName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setPays('');
    setCity('');
    setPostalCode('');
    setProfilePic('');
  };

  return (
    <div className="container mt-5">
      <h1 style={{ margin: "20" }}>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>First name:</label>
          <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Last name:</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Address:</label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Pays:</label>
          <input type="text" className="form-control" value={pays} onChange={(e) => setPays(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>City:</label>
          <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Postal Code:</label>
          <input type="text" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div className="form-group" style={{ margin: "20px" }}>
          <label>Profile Pic:</label>
          <input type="text" className="form-control" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} required />
        </div>
        <button type="submit" style={{ margin: "20px" }} className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};
export default CreateU;
