import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/Layout.css";

function Layout() {
    return (
        <div className="app-shell">

            <Sidebar />

            <main className="app-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;
