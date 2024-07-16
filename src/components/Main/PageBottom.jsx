import '../../styles/PageBottom.scss'; // Import the CSS for styling
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'; // Import social media icons
import logo from '../../assets/logo.png'; // Import the logo image
import { FaX } from 'react-icons/fa6'; // Import another social media icon

const PageBottom = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo section */}
                <div className="footer-logo">
                    <img src={logo} alt="Company Logo" /> {/* Company logo */}
                </div>

                {/* Information section */}
                <div className="footer-info">
                    <p>&copy; 2024 <br />Developed by Team Vision Crafters.</p> {/* Copyright info */}
                    <nav className="footer-nav">
                        {/* Navigation links */}
                        <a>Privacy Policy</a>
                        <a>Terms of Service</a>
                        <a>Contact Us</a>
                    </nav>
                </div>

                {/* Social media icons section */}
                <div className="footer-icons">
                    <a>
                        <FaFacebook /> {/* Facebook icon */}
                    </a>
                    <a>
                        <FaX /> {/* Placeholder for another social media icon */}
                    </a>
                    <a>
                        <FaLinkedin /> {/* LinkedIn icon */}
                    </a>
                    <a>
                        <FaGithub /> {/* GitHub icon */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default PageBottom;
