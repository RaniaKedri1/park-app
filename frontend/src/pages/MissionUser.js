import React, { useEffect, useState } from 'react'
import SideBar from '../component/SideBar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MissionUser = () => {
    const [missions, setmissions] = useState([]);
    const navigate = useNavigate();
    const [deleteMessage, setDeleteMessage] = useState('');

    useEffect(() => {
        const FetchDataMission = async () => {
            try {
                const id = localStorage.getItem('id');
                const response = await axios.get(`http://localhost:5000/api/mission/missionByUser/${id}`);
                setmissions(response.data)
                // console.log("Missions : ============>", response.data);
            } catch (error) {
                console.log("error :", error);
            }
        };
        FetchDataMission()
    }, [])

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (!confirmed) {
            return;
        }
        try {
            // Send DELETE request
            await axios.delete(`http://localhost:5000/api/mission/${id}`);
            // Fetch updated data after deletion
            const response = await axios.get(`http://localhost:5000/api/mission/missionByUser/${id}`);
            // Update the state with the new data
            setmissions(response.data);
            // Scroll to the list to bring it into view
            // inputRef.current.scrollIntoView({ behavior: 'smooth' });
            setDeleteMessage('Mission Deleted Successfully!');
            setTimeout(() => {
                setDeleteMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error deleting data:', error);
            // toast.error('Error deleting blog');
        }
    }

    const handleAdd = () => {
        navigate('/createMission');
    };
    return (
        <div className="app-container">
            <div className="app-content">
                {deleteMessage && <div className="alert alert-info">{deleteMessage}</div>}
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
                        <button className='app-content-headerButton' onClick={handleAdd}>Add Mission</button>

                    </div>
                </div>
                <div className='products-area-wrapper tableView' style={{ color: "#222", height: "620px" }}>
                    {/* Centered content area */}
                    <div className="centered-content" style={{ width: "100%", backgroundColor: "#F8F9FA", padding: "50px 0px 0px 20px", margin: "10px 10px" }}>
                        {/* Content to be centered */}
                        <h1>Missions List</h1>
                        {missions.length === 0 ? (
                            <p>You don't have any missions yet.</p>
                        ) : (
                            <table className='table table-bordered table-striped'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>dateDepart</th>
                                        <th>dateArrive</th>
                                        <th>is_verified</th>
                                        <th>vehicle</th>
                                        <th>user</th>
                                        <th>image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {missions.map(mission => (
                                        <tr key={mission.id}>
                                            <td>{mission.dateDepart}</td>
                                            <td>{mission.dateArrive}</td>
                                            <td>{mission.is_verified}</td>
                                            <td>{mission.vehicle}</td>
                                            <td>{mission.user}</td>
                                            <td>
                                                <img src={mission.image}
                                                    width={40}
                                                    alt='image vehicle' />
                                            </td>
                                            <td style={{ padding: "8px 16px", margin: "4px" }}>
                                                {/* <Link className="btn btn-primary mr-2" style={{ margin: "4px" }} to={`/mission/update/${mission.id}`} >Modifier</Link> */}
                                                <Link className="btn btn-primary mr-2" style={{ margin: "4px" }} to={`/admin/mission/${mission._id}`} >Voir</Link>
                                                <button className="btn btn-danger" onClick={() => handleDelete(mission._id)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MissionUser
