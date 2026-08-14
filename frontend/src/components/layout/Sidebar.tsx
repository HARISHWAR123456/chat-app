import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";
import { navSections } from "./navSections";

function Sidebar() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);

    const displayName = user?.username || user?.email || "Guest";

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <span className="sidebar-brand-mark">N</span>

                <span className="sidebar-brand-name">Nexa</span>

            </div>

            <nav className="sidebar-nav">

                {navSections.map((section) => (
                    <NavLink
                        key={section.id}
                        to={section.path}
                        className={({ isActive }) =>
                            isActive ? "sidebar-link is-active" : "sidebar-link"
                        }
                    >
                        <span className="sidebar-link-icon">
                            {section.icon}
                        </span>

                        {section.label}
                    </NavLink>
                ))}

            </nav>

            <div className="sidebar-footer">

                <div className="sidebar-user">

                    <span className="sidebar-avatar">
                        {displayName.charAt(0).toUpperCase()}
                    </span>

                    <span className="sidebar-user-name">
                        {displayName}
                    </span>

                </div>

                <button
                    type="button"
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    Sign out
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
