import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const MissionDetails = () => {
    const [mission, setmission] = useState({});
    // const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const FetchDataMission = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/mission/${id}`)
                console.log('response :', response.data);
                setmission(response.data)
                console.log("Missions : ============>", response.data);

            } catch (error) {
                console.log("error :", error);
            }
        };
        FetchDataMission()

    }, [])
    return (
        <div className="mission-details-container">
            <div className="mission-details-card">
                {mission &&
                    <>
                        <h2 className="mission-details-title">Missions:</h2>
                        <div className="mission-details-info">
                            <p><strong>Date Depart:</strong> {mission.dateDepart}</p>
                            <p><strong>Date Arrive:</strong> {mission.dateArrive}</p>
                            <p><strong>Verified:</strong> {mission.is_verified ? 'Yes' : 'No'}</p>
                            <p><strong>Vehicle:</strong> {mission.vehicle}</p>
                            <p><strong>User:</strong> {mission.user}</p>
                        </div>
                        <div className="mission-details-image-container">
                            <img src={mission.image} alt='Vehicle' className="mission-details-image" />
                        </div>
                        {/* Uncomment the below if you want to add a 'Modify' button */}
                        {/* <button className="modify-button" onClick={() => navigate(`/mission/update/${mission.id}`)}>Modify</button> */}
                    </>
                }
            </div>
        </div>
    )
}
export default MissionDetails
