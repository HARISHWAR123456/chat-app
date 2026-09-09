import {
    Bell,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import "./Navbar.css";

type SidebarSection = "chats" | "profile" | "settings";

type NavbarProps = {
    activeSection: SidebarSection;
    onProfileClick: () => void;
};

const sectionTitles = {
    chats: "Chats",
    profile: "Profile",
    settings: "Settings",
} as const;

function Navbar({
    activeSection,
    onProfileClick,
}: NavbarProps) {

    return (
        <header className="navbar">

            <div className="page-heading">

                <p className="eyebrow">
                    Personal workspace
                </p>

                <h1>
                    {sectionTitles[activeSection]}
                </h1>

            </div>


            <div className="navbar-actions">

                <label className="search-box">

                    <Search size={17} />

                    <input
                        type="search"
                        placeholder="Search conversations"
                        aria-label="Search conversations"
                    />

                    <span className="search-shortcut">
                        ⌘ /
                    </span>

                </label>


                <button
                    className="icon-button"
                    type="button"
                    aria-label="Open filters"
                >
                    <SlidersHorizontal size={18} />
                </button>


                <button
                    className="icon-button notification-button"
                    type="button"
                    aria-label="View notifications"
                >
                    <Bell size={18} />

                    <span />
                </button>


                <button
                    className="top-avatar"
                    type="button"
                    onClick={onProfileClick}
                    aria-label="Open profile"
                >
                    ?
                </button>

            </div>

        </header>
    );
}

export default Navbar;