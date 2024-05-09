import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup } from 'react-bootstrap'; // Remove Label import
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

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
      localStorage.setItem('id', response.data.result.userId) // Enregistrer isAuth dans le stockage local
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
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <Form onSubmit={handleSubmit}>

                      <FormGroup>
                        <label htmlFor="form2Example11">Email</label>
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          name='email'
                          placeholder=" email address"
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="form2Example22">Password</label>
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          name='password'
                          placeholder="You password"
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <Button variant="primary" type="submit" className="btn-block btn-lg gradient-custom-2 mb-3" onClick={handleSubmit}>Log in</Button>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>
                    </Form>

                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <Link to={'/register'} variant="outline-danger">Create new</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
