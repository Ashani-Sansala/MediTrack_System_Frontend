import { useState } from 'react';
import Viewer from '../../components/Main/Viewer.jsx';
import SideNav from '../../components/Main/SideNav.jsx';
import './VideoFeed.scss';

const VideoFeed = () => {
  const floors = ['01', '02', '03', '04'];
  const cameras = ['01', '02', '03', '04'];

  const [selectedFloors, setSelectedFloors] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedViewer, setSelectedViewer] = useState(null);

  const viewersPerPage = 6;

  const handleFloorChange = (floor) => {
    if (selectedFloors.includes(floor)) {
      setSelectedFloors(selectedFloors.filter(selectedFloor => selectedFloor !== floor));
    } else {
      setSelectedFloors([...selectedFloors, floor]);
    }
    setSelectedCameras([]);
  };

  const handleCameraChange = (camera) => {
    if (selectedCameras.includes(camera)) {
      setSelectedCameras(selectedCameras.filter(selectedCamera => selectedCamera !== camera));
    } else {
      setSelectedCameras([...selectedCameras, camera]);
    }
  };

  const handleReset = () => {
    setSelectedFloors([]);
    setSelectedCameras([]);
    setSelectedViewer(null);
  };

  const generateViewers = () => {
    const allViewers = [];
    floors.forEach(floor => {
      cameras.forEach(camera => {
        const viewer = {
          name: `Floor ${floor} Camera ${camera}`,
          videoSrc: `/footages/Floor${floor}Camera${camera}.mp4`,
        };
        console.log(`Generated viewer: ${viewer.name}, Video Source: ${viewer.videoSrc}`);
        allViewers.push(viewer);
      });
    });
    return allViewers;
  };

  const filteredViewers = generateViewers().filter(viewer => {
    if (selectedFloors.length === 0 && selectedCameras.length === 0) return true;
    const viewerFloor = viewer.name.split(' ')[1];
    const viewerCamera = viewer.name.split(' ')[3];
    return (
        (selectedFloors.length === 0 || selectedFloors.includes(viewerFloor)) &&
        (selectedCameras.length === 0 || selectedCameras.includes(viewerCamera))
    );
  });

  const indexOfLastViewer = currentPage * viewersPerPage;
  const indexOfFirstViewer = indexOfLastViewer - viewersPerPage;
  const currentViewers = filteredViewers.slice(indexOfFirstViewer, indexOfLastViewer);
  const totalPages = Math.ceil(filteredViewers.length / viewersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewerClick = (viewer) => {
    setSelectedViewer(viewer === selectedViewer ? null : viewer);
  };

  return (
      <div className="video-feed-container">
        <SideNav
            floors={floors}
            cameras={cameras}
            selectedFloors={selectedFloors}
            selectedCameras={selectedCameras}
            onFloorChange={handleFloorChange}
            onCameraChange={handleCameraChange}
            onReset={handleReset}
        />
        <div className="video-feed">
          <div className="viewers-grid">
            {currentViewers.map((viewer, index) => (
                <div
                    key={index}
                    className={`viewer-item ${viewer.name === selectedViewer ? 'selected' : ''}`}
                    onClick={() => handleViewerClick(viewer.name)}
                >
                  <Viewer
                      name={viewer.name}
                      videoSrc={viewer.videoSrc}
                      onClick={() => handleViewerClick(viewer.name)}
                      isSelected={viewer.name === selectedViewer}
                  />
                </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default VideoFeed;
