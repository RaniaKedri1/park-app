import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../App.css"
import SideBar from '../component/SideBar';


const UpdateVehicle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [updatedVe, setUpdatedVe] = useState({});
    const [isGridView, setIsGridView] = useState(true);

    useEffect(() => {
        // Fetch the details of the blog post with the specified id and populate the form
        const fetchVehicleDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/vehicle/${id}`);
                setUpdatedVe(response.data);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };
        fetchVehicleDetails();
    }, [id]);

    const handleChange = (e) => {
        setUpdatedVe({
            ...updatedVe,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/vehicle/${id}`, updatedVe);
            console.log('blog created:', response.data);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
        // message.success("Blog updated Successfully!")
    };

    return (
        <div className="app-container">
            <SideBar />
            <div className="app-content">
                <div className="app-content-header">

                    {/* App header content */}
                    <h1 className="app-content-headerText" style={{ color: "#222" }}>Allouer</h1>
                    <div style={{ display: "flex" }}>
                        <button className="mode-switch" title="Switch Theme" style={{ color: "#222" }}>
                            <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                                <defs></defs>
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='products-area-wrapper tableView' style={{ color: "#222", height: "620px" }}>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Marque:</label>
                        <input type="text" className="form-control" name="make" value={updatedVe.make || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Modèle:</label>
                        <input type="text" className="form-control" name="model" value={updatedVe.model || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Année:</label>
                        <input type="number" className="form-control" min="2024" value={updatedVe.year || ""} max="2084" name="year" onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Mileage:</label>
                        <input type="number" className="form-control" name="mileage" value={updatedVe.mileage || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>FuelType:</label>
                        <input type="text" className="form-control" name="fuelType" value={updatedVe.fuelType || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Couleur:</label>
                        <input type="text" className="form-control" name="color" value={updatedVe.color || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Vin:</label>
                        <input type="text" className="form-control" name="vin" value={updatedVe.vin || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>RegistrationNumber:</label>
                        <input type="text" className="form-control" name="registrationNumber" value={updatedVe.registrationNumber || ""} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ margin: "20px" }}>
                        <label>Status:</label>
                        <select className="form-control" name="status" value={updatedVe.status || ""} onChange={handleChange} required>
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="in-use">In Use</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <button type="submit" style={{ margin: "20px" }} onClick={handleSubmit} className="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateVehicle;
