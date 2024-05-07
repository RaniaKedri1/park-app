import React, { useEffect, useState } from 'react';
import "../App.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UpdateVehicle from './UpdateVehicle';
import SideBar from '../component/SideBar';

function Dashboard() {
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const [vehicles, setVehicles] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const navigate = useNavigate();

    const toggleFilterMenu = () => {
        setIsFilterMenuOpen(!isFilterMenuOpen);
    };

    const switchToGridView = () => {
        setIsGridView(true);
    };

    const switchToListView = () => {
        setIsGridView(false);
    };

    const toggleTheme = () => {
        document.documentElement.className.toggle('light'); // This could be handled using React state for a more idiomatic approach
    };

    useEffect(() => {
        const FetchDataVehicle = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/vehicle')
                setVehicles(response.data)
                console.log("Vehicle : ============>", response.data);

            } catch (error) {
                console.log("error :", error);
            }
        };
        FetchDataVehicle()

    }, [])

    const handleDelete = async (id) => {
        try {
            // Logic to handle delete action
            await axios.delete(`http://localhost:5000/api/vehicle/${id}`);
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
            console.log("Vehicle deleted successfully.");
        } catch (error) {
            console.log("Error deleting vehicle:", error);
        }
    };

    const handleAdd = () => {
        navigate('/createVehicle');
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
                        <button className='app-content-headerButton' onClick={handleAdd}>Add Vehicle</button>

                    </div>
                </div>
                <div className={`products-area-wrapper ${isGridView ? 'gridView' : 'tableView'}`} style={{ color: "#222", height: "620px" }}>
                    {/* Product area content */}
                    <div className="products-header" >
                        <div className="product-cell image">
                            Items
                            <button className="sort-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                            </button>
                        </div>
                        <div className="product-cell category">Category<button className="sort-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                        </button></div>
                        <div className="product-cell status-cell">Status<button className="sort-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                        </button></div>
                        <div className="product-cell sales">Sales<button className="sort-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                        </button></div>
                        <div className="product-cell stock">Stock<button className="sort-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                        </button></div>
                        <div className="product-cell price">Price<button className="sort-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                        </button>
                        </div>
                    </div>
                    {/* Centered content area */}
                    <div className={`products-area-wrapper ${isGridView ? 'gridView' : 'tableView'}`} style={{ color: "#222", height: "620px" }}>

                        <div className="centered-content" style={{ width: "100%", height: "100vh", backgroundColor: "#F8F9FA", padding: "50px 0px 0px 20px", margin: "10px 10px" }}>
                            {/* Content to be centered */}
                            <h1>Vehicle List</h1>
                            <table className='table table-bordered table-striped'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>Modèle</th>
                                        <th>Mileage</th>
                                        <th>Année</th>
                                        <th>FuelType</th>
                                        <th>Couleur</th>
                                        <th>Vin</th>
                                        <th>RegistrationNumber</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.map(vehicle => (
                                        <tr key={vehicle.id}>
                                            <td>{vehicle.make}</td>
                                            <td>{vehicle.model}</td>
                                            <td>{vehicle.year}</td>
                                            <td>{vehicle.mileage}</td>
                                            <td>{vehicle.fuelType}</td>
                                            <td>{vehicle.color}</td>
                                            <td>{vehicle.vin}</td>
                                            <td>{vehicle.registrationNumber}</td>
                                            <td>{vehicle.status}</td>
                                            <td style={{ padding: "8px 16px", margin: "4px" }}>
                                                <Link className="btn btn-primary mr-2" style={{ margin: "4px" }} to={`/vehicle/update/${vehicle.id}`} >Modifier</Link>
                                                <button className="btn btn-danger" onClick={() => handleDelete(vehicle.id)}>Supprimer</button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
