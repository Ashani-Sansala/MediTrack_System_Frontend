
import PropTypes from 'prop-types';
import '../../styles/Viewer.scss';

const Viewer = ({ name, videoSrc }) => {
    return (
        <div className="viewer">
            <div className="viewer-name">{name}</div>
            <video className="viewer-video">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

Viewer.propTypes = {
    name: PropTypes.string.isRequired,
    videoSrc: PropTypes.string.isRequired,
};

export default Viewer;
