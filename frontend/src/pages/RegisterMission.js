import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const RegisterMission = () => {

    const [mission, setMission] = useState({})
    const { id } = useParams()
    const [file, setFile] = useState({});


    const handleChange = (e) => {
        setMission({
            ...mission,
            [e.target.name]: e.target.value
        })
    }

    const userID = localStorage.getItem('id')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!mission.dateDepart || !mission.dateArrive || !file) {
                console.error("Tous les champs doivent être remplis");
                return;
            }

            const formData = new FormData();
            formData.append('dateDepart', mission.dateDepart);
            formData.append('dateArrive', mission.dateArrive);
            formData.append('file', file);
            formData.append('user', userID);

            const response = await axios.post(`http://localhost:5000/api/mission/register/${id}`, formData);
            console.log("Missions : ============>", response.data);

        } catch (error) {
            console.log("error :", error);
        }
    };



    return (
        <div className='products-area-wrapper tableView' style={{ color: "#222", height: "660px" }}>
            <h1 style={{ margin: "20" }}  >Add Mission</h1>
            <div>
                <div className="form-group" style={{ margin: "20px" }}>
                    <label>dateDepart:</label>
                    <input type="date" className="form-control" name="dateDepart" onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ margin: "20px" }}>
                    <label>dateArrive:</label>
                    <input type="date" className="form-control" name="dateArrive" onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ margin: "20px" }}>
                    <label>image:</label>
                    <input type="file" className="form-control" name="file" onChange={(e) => setFile(e.target.files[0])} required />                </div>
                {/* <div className="form-group" style={{ margin: "20px" }}>
                    <label>is_verified:</label>
                    <select className="form-control" name="is_verified" onChange={handleChange} required>
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div> */}
            </div>
            <button type="submit" style={{ margin: "20px" }} onClick={handleSubmit} className="btn btn-primary">Add Mission</button>
        </div>
    )
}

export default RegisterMission