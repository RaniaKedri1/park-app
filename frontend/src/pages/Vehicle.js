import React, { useEffect, useState } from 'react';
import "../App.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataVehicle = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehicle');
                setVehicles(response.data);
            } catch (error) {
                console.log("Error :", error);
            }
        };
        fetchDataVehicle();
    }, []);



    return (
        <section style={{ backgroundColor: '#eee', minHeight: '100vh' }}>

            <div className="container py-5">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12 col-xl-10">
                        <div className="card shadow-0 border rounded-3">
                            <div className="card-body" style={{ overflow: 'auto', maxHeight: '80vh' }}>
                                {vehicles.map(vehicle => (
                                    <div className="row" key={vehicle.id} style={{ marginBottom: '50px', marginBottom: '15px' }}>
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                <img src={vehicle.image} className="w-100" alt={vehicle.make} />
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h5>{vehicle.make}</h5>
                                            <div className="mt-1 mb-0 text-muted small">
                                                <span>{vehicle.model} </span>
                                                <span className="text-primary"> • </span>
                                                <span>{vehicle.year} </span>
                                                <span className="text-primary"> • </span>
                                                <span>{vehicle.mileage} <br /></span>
                                            </div>
                                            <div className="mb-2 text-muted small">
                                                <span>{vehicle.fuelType} </span>
                                                <span className="text-primary"> • </span>
                                                <span>{vehicle.color} </span>
                                                <span className="text-primary"> • </span>
                                                <span>{vehicle.registrationNumber} <br /></span>
                                                <span>{vehicle.status} <br /></span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">{vehicle.prix} DT</h4>
                                            </div>
                                            <h6 className="text-success">{vehicle.status}</h6>
                                            <div className="d-flex flex-column mt-4">
                                                {/* <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" type="button">Details</button> */}
                                                <button
                                                    data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-outline-primary btn-sm mt-2"
                                                    type="button"
                                                >
                                                    Add to wishlist
                                                </button>
                                                <Link className="btn btn-primary mr-2" style={{ margin: "4px" }} to={`/mission/${vehicle.id}`} >Voir</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Vehicle;
