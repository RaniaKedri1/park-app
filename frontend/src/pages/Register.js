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
        <div className="container mt-5">
            <h2>Register</h2>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <FormGroup >
                    <label htmlFor="email">firstname</label> {/* Use regular label element */}
                    <input
                        type="teyt"
                        name="firstname"
                        id="firstname"
                        className="form-control"
                        placeholder="Enter your firstname"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">lastName</label> {/* Use regular label element */}
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-control"
                        placeholder="Enter your lastName"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">email</label> {/* Use regular label element */}
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
                    <label htmlFor="password">password</label> {/* Use regular label element */}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">confirm password</label> {/* Use regular label element */}
                    <input
                        type="password"
                        name="repeatPassword"
                        id="repeatPassword"
                        className="form-control"
                        placeholder="Enter your confirm password"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">address</label> {/* Use regular label element */}
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="form-control"
                        placeholder="Enter your address"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="Tel">Tel</label> {/* Use regular label element */}
                    <input
                        type="Text"
                        name="Tel"
                        id="Tel"
                        className="form-control"
                        placeholder="Enter your Tel"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="pays">pays</label> {/* Use regular label element */}
                    <input
                        type="text"
                        name="pays"
                        id="pays"
                        className="form-control"
                        placeholder="Enter your pays"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="city">city</label> {/* Use regular label element */}
                    <input
                        type="text"
                        name="city"
                        id="city"
                        className="form-control"
                        placeholder="Enter your city"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">postalCode</label> {/* Use regular label element */}
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        className="form-control"
                        placeholder="Enter your postalCode"
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

export default Register;
