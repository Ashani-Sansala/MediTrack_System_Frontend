// src/pages/ManageCamera/ManageCamera.jsx
import { useState, useEffect } from 'react';
import SmallButton from '../../components/Main/SmallButton.jsx';
import PopUp from '../../components/Main/PopUp.jsx';
import './ManageCamera.scss';
import API_URL from '../../API';

const api_url = API_URL;

const ManageCamera = () => {
    const [cameras, setCameras] = useState([]);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [newCameraLocation, setNewCameraLocation] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCameras();
    }, []);

    const fetchCameras = () => {
        fetch(`${api_url}/manageCamera/cameras`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cameras');
                }
                return response.json();
            })
            .then(data => {
                setCameras(data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching cameras:', error);
                setError('Failed to fetch cameras');
            });
    };

    const addCamera = () => {
        const newCamera = { Location: newCameraLocation };
        fetch(`${api_url}/manageCamera/add_camera`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCamera),
        })
            .then(response => response.json())
            .then(() => {
                fetchCameras(); // Refresh the camera list after adding a new camera
                setIsPopUpOpen(false); // Close the popup
                setNewCameraLocation(''); // Reset the input field
            })
            .catch(error => console.error('Error adding camera:', error));
    };

    const removeCamera = (cameraId) => {
        fetch(`${api_url}/manageCamera/remove_camera/${cameraId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => fetchCameras()) // Refresh the camera list after removing a camera
            .catch(error => console.error('Error removing camera:', error));
    };

    return (
        <div className={`table-container ${isPopUpOpen ? 'blur' : ''}`}>
            {error && <div>Error: {error}</div>}
            <table>
                <thead>
                <tr>
                    <th>Camera Id</th>
                    <th>Location</th>
                    <th>Remove camera</th>
                </tr>
                </thead>
                <tbody>
                {cameras.map((camera) => (
                    <tr key={camera.CameraID}>
                        <td>{camera.CameraID}</td>
                        <td>{camera.Location}</td>
                        <td>
                            <SmallButton className="small_button_red" onClick={() => removeCamera(camera.CameraID)}>
                                Remove
                            </SmallButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <SmallButton className="small_button_green" onClick={() => setIsPopUpOpen(true)}>
                Add New Camera
            </SmallButton>

            <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
                <h2>Add New Camera</h2>
                <form onSubmit={(e) => { e.preventDefault(); addCamera(); }}>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={newCameraLocation}
                            onChange={(e) => setNewCameraLocation(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Add Camera</button>
                </form>
            </PopUp>
        </div>
    );
};

export default ManageCamera;
