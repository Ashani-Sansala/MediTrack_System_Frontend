// SideNav.jsx
import PropTypes from 'prop-types';
import '../../styles/SideNav.scss'; // Make sure to have a corresponding CSS file for styling

const SideNav = ({ floors, cameras, selectedFloors, selectedCameras, onFloorChange, onCameraChange, onReset }) => {
    return (
        <div className="side-nav">
            <h2>Navigation</h2>
            {floors.map(floor => (
                <div key={floor} className="floor-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedFloors.includes(floor)}
                            onChange={() => onFloorChange(floor)}
                        />
                        <span className="bold-text">Floor {floor}</span>
                    </label>
                    <div className="camera-selection" style={{ marginLeft: '20px' }}>
                        {cameras.map(camera => (
                            <label key={camera} className="checkbox-label camera-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedCameras.includes(camera) && selectedFloors.includes(floor)}
                                    onChange={() => onCameraChange(camera)}
                                    disabled={!selectedFloors.includes(floor)}
                                />
                                Camera {camera}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button className="resetButton" onClick={onReset}>Reset</button>
        </div>
    );
};

SideNav.propTypes = {
    floors: PropTypes.arrayOf(PropTypes.string).isRequired,
    cameras: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedFloors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedCameras: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFloorChange: PropTypes.func.isRequired,
    onCameraChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default SideNav;