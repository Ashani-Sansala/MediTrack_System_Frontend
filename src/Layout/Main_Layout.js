import {Outlet} from "react-router-dom";
import Title_Bar from "../Components/Title_Bar";
import Nav_Bar from "../Components/Nav_Bar";

export default function MainLayout() {
    return (
        <div>
            <Title_Bar/>
            <Nav_Bar/>

            <Outlet />

        </div>
    );
}
