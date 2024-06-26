import './landingPage.scss'
import clip from "../login/client/loginPage/loginAssets/clip.mp4";
import LandingPageButton from "../../components/Main/LandingPageButton.jsx";



const LandingPage = () => {
    return (
        <div className="main">
            <div className="videoCont">
                <video src={clip} autoPlay muted loop></video>
            </div>
            <div className="text">
                <div className="heading1">Hi!</div> <br/> <div className="heading2">Welcome to the MediTracker.. </div>
                <div className="ButtonCont">
                    <br />
                    <LandingPageButton
                        to="/login"
                    >
                        Sign In
                    </LandingPageButton>
                </div>
            </div>


        </div>
    )
}
export default LandingPage
