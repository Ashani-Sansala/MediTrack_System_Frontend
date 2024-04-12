import React from "react";
import '../../styles/Login.css'
import LongButton from "./LongButton.jsx";

const Login = () => {
    return (
        <div className="ContLogin">
            <div className="LogoCont">
                <img src='/meditracker.png' alt='Logo'/>
            </div>
            <div className="FormCont">
                <form>
                    Username
                    <br/>
                    <input type="text"/>
                    <br/>
                    Password
                    <br/>
                    <input type="password"/>
                    <br />
                    <LongButton to="/logged/Dashboard" className="long_button_blue">
                        Log In
                    </LongButton>
                </form>

            </div>

        </div>
    );
};

export default Login;