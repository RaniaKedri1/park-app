import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup } from 'react-bootstrap'; // Remove Label import
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', info);
      localStorage.setItem('token', response.data.result.token);// Enregistrer token dans le stockage local
      localStorage.setItem('isAuth', true) // Enregistrer isAuth dans le stockage local
      // Handle successful login response here, e.g., redirect to dashboard
      if (response) {
        navigate('/home')
      }
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle login error
      setError(error.response.data.message);
      // console.log("error de login");
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth') || 'false'; // Assurez-vous de récupérer une chaîne de caractères
    if (isAuth === 'true') {
      navigate('/home');
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="email">Email</label> {/* Use regular label element */}
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label> {/* Use regular label element */}
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </FormGroup>
        <Button variant="primary" type="submit">Submit</Button> {/* Use variant instead of color */}
      </Form>
      <div className="mt-3">
        <p>Don't have an account? <a href="/register">Sign up here</a>.</p>
      </div>
    </div>
  );
};

export default Login;
