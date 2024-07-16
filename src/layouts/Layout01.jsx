import {Outlet} from "react-router-dom";
import TitleBarLanding from "../components/Main/TitleBarLanding.jsx";
import '../styles/Layout01.scss'

// Layout for login page
export default function Layout01() {
    return (
        <div className="Container">
            <div className="TopCont">
                <TitleBarLanding/>
            </div>

            <div className="Cont">
                <Outlet/>
            </div>
        </div>
    );
}
