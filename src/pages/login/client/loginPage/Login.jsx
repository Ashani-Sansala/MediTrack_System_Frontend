import "./Login.scss";
import clip from "./loginAssets/clip.mp4";
import logo from "./loginAssets/logo.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
    const [error, setError] = useState(""); // State to handle login errors

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        try {
            const response = await axios.post(
                "http://localhost:5000/login/authenticate",
                { username, password }
            );

            console.log(response.data); // handle response from backend

            if (response.data.success) {
                // Redirect to managecamera page if login successful
                window.location.href = "/signin/managecamera";
            } else {
                // Display error message if login unsuccessful
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error); // handle error response
        }
    };

    return (
        <div className="loginPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={clip} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className="title">
                            Empowering healthcare with innovative system solutions.
                        </h2>
                        <p>Track, locate, and optimize hospital assets.</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Start tracking hospital assets!</span>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome back!</h3>
                    </div>

                    <form action="" className="form grid" onSubmit={handleSubmit}>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>

                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id="username" placeholder="Enter Username" />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>

                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input type="password" id="password" placeholder="Enter Password" />
                            </div>
                        </div>

                        <div className="error">{error}</div>
                        <button type="submit" className="btn flex">
                            <span>Login </span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
