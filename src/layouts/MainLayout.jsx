import {Outlet} from "react-router-dom";
import TitleBar from "../components/Main/TitleBar.jsx";
import NavBar from "../components/Main/NavBar.jsx";
import PageBottom from "../components/Main/PageBottom.jsx";
import '../styles/MainLayout.scss'

// Layout for system
export default function MainLayout() {
    return (
        <div>
            <div className="TopContM">
                <TitleBar/>
                <NavBar />
            </div>
            <div className="ContM">
                <Outlet />
            </div>
            <div className="BottomContM">
                <PageBottom />
            </div>

        </div>
    );
}
