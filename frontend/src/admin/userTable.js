import React, { useEffect, useState } from 'react';
import "../App.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../component/SideBar';

function Users() {
    const [isGridView] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const FetchDataUser = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/user')
                setUsers(response.data)
                console.log("User : ============>", response.data);

            } catch (error) {
                console.log("error :", error);
            }
        };
        FetchDataUser()

    }, [])

    const handleEdit = (id) => {
        // Logic to handle edit action
        console.log("Edit User with ID:", id);
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/${id}`);
            // Here, you're trying to filter users based on `user.id`, which might not exist.
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            console.log("User deleted successfully.");
        } catch (error) {
            console.log("Error deleting user:", error);
        }
    };

    const handleAdd = () => {
        navigate('/createUser');
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
                        </button>
                        <button className='app-content-headerButton' onClick={handleAdd}>Add User</button>


                    </div>
                </div>
                <div className={`products-area-wrapper ${isGridView ? 'gridView' : 'tableView'}`} style={{ color: "#222", height: "620px" }}>
                    <div className="centered-content" style={{ width: "100%", backgroundColor: "#F8F9FA", padding: "50px 0px 0px 20px", margin: "10px 10px" }}>
                        {/* Content to be centered */}
                        <h1>User List</h1>
                        <table className='table table-bordered table-striped'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>first name</th>
                                    <th>last Name</th>
                                    <th>email</th>
                                    <th>address</th>
                                    <th>pays</th>
                                    <th>city</th>
                                    <th>postal Code</th>
                                    <th>profile Pic</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.pays}</td>
                                        <td>{user.city}</td>
                                        <td>{user.postalCode}</td>
                                        <td>
                                            <img src={user.profilePic} width={100} />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mr-2" onClick={() => handleEdit(user.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Users