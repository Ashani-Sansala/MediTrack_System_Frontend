import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './VideoFeed.scss'; 

const api_url = import.meta.env.VITE_API_URL; // Fetching API URL from environment variables

export default function VideoFeed() {
  // State hooks for managing selected cameras, video mapping, and camera feeds
  const [selectedCameras, setSelectedCameras] = useState({
    floor1: [],
    floor2: [],
    floor3: [],
  });
  const [videoMapping, setVideoMapping] = useState({}); // State to store video mapping data
  const [cameraFeeds, setCameraFeeds] = useState([]); // State to store selected camera feeds

  // Fetching video mapping data on component mount
  useEffect(() => {
    const fetchVideoMapping = async () => {
      try {
        const response = await axios.get(`${api_url}/videoFeed/videos`); // Fetching video mapping from API
        setVideoMapping(response.data); // Updating video mapping state with fetched data
      } catch (error) {
        console.error('Error fetching video mapping:', error); // Logging error if fetching fails
      }
    };
    fetchVideoMapping(); // Calling fetch function
  }, []); // Empty dependency array ensures effect runs only once on mount

  // Handler for floor checkbox change
  const handleFloorCheckboxChange = (floor) => {
    const allCameras = ['Camera 01', 'Camera 02', 'Camera 03', 'Camera 04']; // All available camera options

    // Toggle selected cameras for the floor
    const newSelectedCameras = selectedCameras[floor].length === allCameras.length ? [] : allCameras;

    // Ensure total selected cameras across all floors does not exceed 4
    if (newSelectedCameras.length + getTotalSelectedCameras() <= 4) {
      setSelectedCameras((prevSelectedCameras) => ({
        ...prevSelectedCameras,
        [floor]: newSelectedCameras,
      }));
    }
  };

  // Handler for camera checkbox change
  const handleCameraCheckboxChange = (floor, camera) => {
    const isSelected = selectedCameras[floor].includes(camera); // Check if camera is already selected
    const totalSelected = getTotalSelectedCameras(); // Total currently selected cameras

    // Alert if trying to select more than 4 cameras
    if (!isSelected && totalSelected >= 4) {
      alert('You can only select up to four camera feeds.');
      return;
    }

    // Toggle selected camera for the floor
    setSelectedCameras((prevSelectedCameras) => {
      const newSelectedCameras = isSelected
        ? prevSelectedCameras[floor].filter((c) => c !== camera) // Deselect camera
        : [...prevSelectedCameras[floor], camera]; // Select camera
      return { ...prevSelectedCameras, [floor]: newSelectedCameras };
    });
  };

  // Function to calculate total selected cameras across all floors
  const getTotalSelectedCameras = () => {
    return Object.values(selectedCameras).flat().length; // Flattening and counting selected cameras
  };

  // Effect to update camera feeds whenever selected cameras or video mapping changes
  useEffect(() => {
    const selectedFeeds = Object.keys(selectedCameras).reduce((feeds, floor) => {
      const floorCameras = selectedCameras[floor]; // Selected cameras for current floor
      const floorFeeds = floorCameras.map(camera => videoMapping[floor][camera]); // Mapping selected cameras to video URLs
      return [...feeds, ...floorFeeds]; // Accumulating all selected camera feeds
    }, []);
    setCameraFeeds(selectedFeeds); // Updating camera feeds state
  }, [selectedCameras, videoMapping]); // Dependency array ensures effect runs when selectedCameras or videoMapping changes

  // Rendering the VideoFeed component UI
  return (
    <div className="video-feed-container">
      {/* Sidebar with camera selection */}
      <div className="sidebar">
        <h3>Choose Camera</h3>
        {/* List of floors with camera checkboxes */}
        <ul className="floor-list">
          {['floor1', 'floor2', 'floor3'].map((floor, index) => (
            <li key={floor}>
              <h4>
                <input
                  type="radio"
                  id={floor}
                  name={floor}
                  onChange={() => handleFloorCheckboxChange(floor)}
                  checked={selectedCameras[floor].length === 4} // Checking if all cameras for the floor are selected
                />
                <label htmlFor={floor}>Floor {index + 1}</label>
              </h4>
              {/* List of cameras for the floor with checkboxes */}
              <ul className="camera-list">
                {['Camera 01', 'Camera 02', 'Camera 03', 'Camera 04'].map((camera) => (
                  <li key={camera}>
                    <input
                      type="checkbox"
                      id={`${floor}-${camera}`}
                      name={`${floor}-${camera}`}
                      value={camera}
                      onChange={() => handleCameraCheckboxChange(floor, camera)}
                      checked={selectedCameras[floor].includes(camera)} // Checking if camera is selected
                      disabled={!selectedCameras[floor].includes(camera) && getTotalSelectedCameras() >= 4} // Disabling if total selected cameras exceed 4
                    />
                    <label htmlFor={`${floor}-${camera}`}>{camera}</label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {/* Video grid displaying selected camera feeds */}
      <div className="video-grid">
        {cameraFeeds.map((url, index) => (
          <div key={index} className="video-box">
            <video width="100%" autoPlay muted>
              <source src={url} type={url.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}
