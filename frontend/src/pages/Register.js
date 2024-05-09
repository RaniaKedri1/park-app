import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup } from 'react-bootstrap'; // Remove Label import
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {
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
            if (info.password !== info.repeatPassword) {
                setError('password not match.')
                return
            }
            const response = await axios.post('http://localhost:5000/api/user/register', info);
            // Handle successful login response here, e.g., redirect to dashboard
            if (response) {
                navigate('/login')
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
        <section className="h-100 h-custom gradient-custom-2" style={{ paddingBottom: '240px', width: '100%', maxHeight: '1024px', overflowY: 'auto' }}>           <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 mb-5">
                    <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>General Infomation</h3>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="text" id="firstname"
                                                        onChange={handleChange}
                                                        name="firstname" className="form-control form-control-lg" />
                                                    <label className="form-label" name="firstname" htmlFor="firstname">First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        id="lastName"
                                                        className="form-control form-control-lg"
                                                        onChange={handleChange}
                                                    />

                                                    <label className="form-label" htmlFor="lastname">Last name</label>
                                                </div>
                                            </div>
                                            <div className="mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline form-white">
                                                    <input type="email" id="form3Examplea2"
                                                        onChange={handleChange}
                                                        name="email" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea2">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="password" id="lastName"
                                                        onChange={handleChange}
                                                        name="password" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="lastname">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="password" id="lastName"
                                                        onChange={handleChange}
                                                        name="repeatPassword" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="lastname">Confirm Password</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add other input fields similarly */}

                                    </div>
                                </div>
                                <div className="col-lg-6 bg-indigo text-white">
                                    <div className="p-5">
                                        <h3 className="fw-normal mb-5">Contact Details</h3>

                                        {/* Replace React form input fields with the ones from the template */}
                                        <div className="mb-4 pb-2">
                                            <div data-mdb-input-init className="form-outline form-white">
                                                <input type="text" id="form3Examplea2"
                                                    onChange={handleChange}
                                                    name="address" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="form3Examplea2">Street + Nr</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-5 mb-4 pb-2">

                                                <div data-mdb-input-init className="form-outline form-white">
                                                    <input type="text" id="form3Examplea4"
                                                        onChange={handleChange}
                                                        name="Tel" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea4">Phone</label>
                                                </div>

                                            </div>
                                            <div className="col-md-7 mb-4 pb-2">

                                                <div data-mdb-input-init className="form-outline form-white">
                                                    <input type="text" id="form3Examplea5"
                                                        onChange={handleChange}
                                                        name="pays" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea5">Pays</label>
                                                </div>

                                            </div>

                                            <div className="col-md-5 mb-4 pb-2">

                                                <div data-mdb-input-init className="form-outline form-white">
                                                    <input type="text" id="form3Examplea4"
                                                        onChange={handleChange}
                                                        name='city' className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea4">City</label>
                                                </div>

                                            </div>
                                            <div className="col-md-7 mb-4 pb-2">

                                                <div data-mdb-input-init className="form-outline form-white">
                                                    <input type="text" id="form3Examplea5"
                                                        onChange={handleChange}
                                                        name='postalCode' className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea5">Zip Code</label>
                                                </div>

                                            </div>
                                        </div>
                                        <Button onClick={handleSubmit} variant="light" size="lg">Register</Button>
                                    </div>
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

export default Register;
