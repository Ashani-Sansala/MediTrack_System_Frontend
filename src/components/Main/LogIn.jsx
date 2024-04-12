import React from "react";
import '../../styles/Login.css'

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

                </form>

            </div>

        </div>
    );
};

export default Login;