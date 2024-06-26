import {Outlet} from "react-router-dom";
import '../styles/Layout02.scss'



export default function Layout02() {
    return (
        <div className="Container">
            <div className="Cont">
                <Outlet/>
            </div>
        </div>
    );
}
