import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoFeed.scss';

export default function VideoFeed() {
  const [selectedCameras, setSelectedCameras] = useState({
    floor1: [],
    floor2: [],
    floor3: [],
  });
  const [videoMapping, setVideoMapping] = useState({});
  const [cameraFeeds, setCameraFeeds] = useState([]);

  useEffect(() => {
    const fetchVideoMapping = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideoMapping(response.data);
      } catch (error) {
        console.error('Error fetching video mapping:', error);
      }
    };
    fetchVideoMapping();
  }, []);

  const handleFloorCheckboxChange = (floor) => {
    const allCameras = ['Camera 01', 'Camera 02', 'Camera 03', 'Camera 04'];
    const newSelectedCameras = selectedCameras[floor].length === allCameras.length ? [] : allCameras;

    if (newSelectedCameras.length + getTotalSelectedCameras() <= 4) {
      setSelectedCameras((prevSelectedCameras) => ({
        ...prevSelectedCameras,
        [floor]: newSelectedCameras,
      }));
    }
  };

  const handleCameraCheckboxChange = (floor, camera) => {
    const isSelected = selectedCameras[floor].includes(camera);
    const totalSelected = getTotalSelectedCameras();

    if (!isSelected && totalSelected >= 4) {
      alert('You can only select up to four camera feeds.');
      return;
    }

    setSelectedCameras((prevSelectedCameras) => {
      const newSelectedCameras = isSelected
        ? prevSelectedCameras[floor].filter((c) => c !== camera)
        : [...prevSelectedCameras[floor], camera];
      return { ...prevSelectedCameras, [floor]: newSelectedCameras };
    });
  };

  const getTotalSelectedCameras = () => {
    return Object.values(selectedCameras).flat().length;
  };

  useEffect(() => {
    const selectedFeeds = Object.keys(selectedCameras).reduce((feeds, floor) => {
      const floorCameras = selectedCameras[floor];
      const floorFeeds = floorCameras.map(camera => videoMapping[floor][camera]);
      return [...feeds, ...floorFeeds];
    }, []);
    setCameraFeeds(selectedFeeds);
  }, [selectedCameras, videoMapping]);

  return (
    <div className="video-feed-container">
      <div className="sidebar">
        <h3>Choose Camera</h3>
        <ul className="floor-list">
          {['floor1', 'floor2', 'floor3'].map((floor, index) => (
            <li key={floor}>
              <h4>
                <input
                  type="checkbox"
                  id={floor}
                  name={floor}
                  onChange={() => handleFloorCheckboxChange(floor)}
                  checked={selectedCameras[floor].length === 4}
                />
                <label htmlFor={floor}>Floor {index + 1}</label>
              </h4>
              <ul className="camera-list">
                {['Camera 01', 'Camera 02', 'Camera 03', 'Camera 04'].map((camera) => (
                  <li key={camera}>
                    <input
                      type="checkbox"
                      id={`${floor}-${camera}`}
                      name={`${floor}-${camera}`}
                      value={camera}
                      onChange={() => handleCameraCheckboxChange(floor, camera)}
                      checked={selectedCameras[floor].includes(camera)}
                      disabled={!selectedCameras[floor].includes(camera) && getTotalSelectedCameras() >= 4}
                    />
                    <label htmlFor={`${floor}-${camera}`}>{camera}</label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="video-grid">
        {cameraFeeds.map((url, index) => (
          <div key={index} className="video-box">
            <video width="100%" controls>
              <source src={url} type={url.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}
