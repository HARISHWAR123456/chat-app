import {
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { getAvatarGradient, getInitials } from "../../utils/avatar";
import "./Navbar.css";

type SidebarSection = "chats" | "profile" | "settings";

type NavbarProps = {
  activeSection: SidebarSection;
  onProfileClick: () => void;
  onToggleMobileSidebar: () => void;
};

const sectionTitles = {
  chats: "Messages",
  profile: "My Profile",
  settings: "Settings",
} as const;

function Navbar({
  activeSection,
  onProfileClick,
  onToggleMobileSidebar,
}: NavbarProps) {
  const user = useAppSelector((state) => state.user.user);
  const username = user?.username || "Guest";
  const userInitials = getInitials(username);
  const avatarGradient = getAvatarGradient(user?.id || username);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          type="button"
          onClick={onToggleMobileSidebar}
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div className="page-heading">
          <p className="eyebrow">Nexa Hub</p>
          <h1>{sectionTitles[activeSection]}</h1>
        </div>
      </div>

      <div className="navbar-actions">
        <label className="search-box">
          <Search size={15} />
          <input
            type="search"
            placeholder="Search in Nexa..."
            aria-label="Search"
          />
          <span className="search-shortcut">⌘/</span>
        </label>

        <button
          className="icon-button notification-button"
          type="button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={17} />
          <span className="unread-dot" />
        </button>

        <button
          className="top-avatar"
          type="button"
          onClick={onProfileClick}
          style={{ background: avatarGradient }}
          title={`Signed in as ${username}`}
          aria-label="Open profile"
        >
          <span>{userInitials}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;