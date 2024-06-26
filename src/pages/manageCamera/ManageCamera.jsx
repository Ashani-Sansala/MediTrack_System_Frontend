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
    const [newCameraIp, setNewCameraIp] = useState('');
    const [newCameraModel, setNewCameraModel] = useState('');
    const [newCameraInstallationDate, setNewCameraInstallationDate] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

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

    const addLocationAndCamera = async () => {
        try {
            // Step 1: Add Location
            const responseLocation = await fetch(`${api_url}/manageCamera/add_location`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ locId: newCameraLocation }),
            });

            if (!responseLocation.ok) {
                throw new Error('Failed to add location');
            }

            // Step 2: Add Camera
            const newCamera = {
                locId: newCameraLocation,
                ipAddress: newCameraIp,
                model: newCameraModel,
                installationDate: newCameraInstallationDate,
            };

            const responseCamera = await fetch(`${api_url}/manageCamera/add_camera`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCamera),
            });

            if (!responseCamera.ok) {
                throw new Error('Failed to add camera');
            }

            // Refresh camera list after successful addition
            fetchCameras();
            setSuccessMessage('Camera added successfully');
            setIsPopUpOpen(false); // Close the popup
            setNewCameraLocation(''); // Reset the input fields
            setNewCameraIp('');
            setNewCameraModel('');
            setNewCameraInstallationDate('');
        } catch (error) {
            console.error('Error adding camera:', error);
            setError('Failed to add camera');
        }
    };

    const removeCamera = (cameraId) => {
        const url = `${api_url}/manageCamera/remove_camera/${cameraId}`;
        console.log(`Attempting to remove camera with URL: ${url}`);
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to remove camera');
                }
                return response.json();
            })
            .then(() => {
                fetchCameras(); // Refresh the camera list after removing a camera
                setSuccessMessage('Camera removed successfully');
            })
            .catch(error => {
                console.error('Error removing camera:', error);
                setError('Failed to remove camera');
            });
    };

    return (
        <div className={`table-container ${isPopUpOpen ? 'blur' : ''}`}>
            {error && <div className="error">Error: {error}</div>}
            {successMessage && (
                <PopUp isOpen={!!successMessage} onClose={() => setSuccessMessage('')}>
                    <h2>Success</h2>
                    <p>{successMessage}</p>
                </PopUp>
            )}
            <h1>Manage Camera</h1>
            <table>
                <thead>
                <tr>
                    <th>Camera Id</th>
                    <th>Location</th>
                    <th>IP Address</th>
                    <th>Model</th>
                    <th>Installation Date</th>
                    <th>Remove camera</th>
                </tr>
                </thead>
                <tbody>
                {cameras.map((camera) => (
                    <tr key={camera.cameraId}>
                        <td>{camera.cameraId}</td>
                        <td>{camera.locId}</td>
                        <td>{camera.ipAddress}</td>
                        <td>{camera.model}</td>
                        <td>{camera.installationDate}</td>
                        <td>
                            <SmallButton className="small_button_red" onClick={() => removeCamera(camera.cameraId)}>
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
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addLocationAndCamera();
                }}>
                    <div className="FormCont">
                        <label>
                            Location:
                            <input
                                type="text"
                                value={newCameraLocation}
                                onChange={(e) => setNewCameraLocation(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            IP Address:
                            <input
                                type="text"
                                value={newCameraIp}
                                onChange={(e) => setNewCameraIp(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Model:
                            <input
                                type="text"
                                value={newCameraModel}
                                onChange={(e) => setNewCameraModel(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Installation Date:
                            <input
                                type="date"
                                value={newCameraInstallationDate}
                                onChange={(e) => setNewCameraInstallationDate(e.target.value)}
                                required
                            />
                        </label>
                        <div className="ButtonCont1">
                            <SmallButton type="submit" className="small_button_green">
                                Add Camera
                            </SmallButton>
                        </div>
                    </div>
                </form>
            </PopUp>
        </div>
    );
};

export default ManageCamera;
