import '../../styles/PageBottom.scss';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { FaX } from 'react-icons/fa6';

const PageBottom = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="Company Logo" />
                </div>
                <div className="footer-info">
                    <p>&copy; 2024 <br />Developed by Team Vision Crafters.</p>
                    <nav className="footer-nav">
                        <a>Privacy Policy</a>
                        <a>Terms of Service</a>
                        <a>Contact Us</a>
                    </nav>
                </div>
                <div className="footer-icons">
                    <a>
                        <FaFacebook />
                    </a>
                    <a>
                        <FaX />
                    </a>
                    <a>
                        <FaLinkedin />
                    </a>
                    <a>
                        <FaGithub />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default PageBottom;
