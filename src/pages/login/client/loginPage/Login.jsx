import "./Login.scss"
import clip from "./loginAssets/clip.mp4"
import logo from "./loginAssets/logo.png"

export const Login = () => {
    return (
        <div className='loginPage flex'>
            <div className="container flex">

                <div className='videoDiv'>
                    <video src={clip} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className="title">Create and Sell Extraordinary Products</h2>
                        <p>Adopt the peace of nature!</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Have a nice day!</span>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome back!</h3>
                    </div>

                    <form action="" className="form grid">
                        <span>Login Status will go here</span>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>

                            <div className="input flex">

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
    //24:38 / 1:34:52
}
