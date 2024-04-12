
import TitleBarLanding from "../../components/Main/TitleBarLanding.jsx";
import PageBottom from "../../components/Main/PageBottom.jsx";
import './Layout02.css'
import Login from "../../components/Main/LogIn.jsx";



export default function Layout02() {
    return (
        <div>
            <div className="TopCont">
                <TitleBarLanding/>
            </div>

            <div className="Cont">
                <Login/>
            </div>
            <div className="BottomCont">
                <PageBottom/>
            </div>

        </div>
    );
}
