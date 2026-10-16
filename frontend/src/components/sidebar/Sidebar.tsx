import {
  CircleUserRound,
  MessageSquare,
  Settings,
  Plus,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";
import { getAvatarGradient, getInitials } from "../../utils/avatar";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

type SidebarSection = "chats" | "profile" | "settings";

type SidebarProps = {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
  onOpenNewChat: () => void;
  onOpenProfile: () => void;
};

const sections = [
  {
    id: "chats",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    id: "profile",
    label: "Profile",
    icon: CircleUserRound,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
] as const;

function Sidebar({
  activeSection,
  onSectionChange,
  onOpenNewChat,
  onOpenProfile,
}: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(logout());
    navigate("/login");
  };

  const username = user?.username || "Guest";
  const userInitials = getInitials(username);
  const avatarBg = getAvatarGradient(user?.id || username);

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          <Sparkles size={18} />
        </div>
        <div className="brand-text">
          <span className="brand-title">Nexa</span>
          <span className="brand-tag">v2.0</span>
        </div>
      </div>

      {/* New Chat Primary Action */}
      <button
        className="new-chat-button"
        type="button"
        onClick={onOpenNewChat}
        aria-label="Start new chat"
      >
        <div className="new-chat-icon">
          <Plus size={16} strokeWidth={2.5} />
        </div>
        <span>New Chat</span>
        <span className="shortcut" title="Keyboard shortcut">
          ⌘K
        </span>
      </button>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="nav-label">Workspace</p>

        {sections.map(({ id, label, icon: Icon }) => (
          <button
            className={`nav-item ${activeSection === id ? "active" : ""}`}
            key={id}
            type="button"
            onClick={() => onSectionChange(id)}
            aria-current={activeSection === id ? "page" : undefined}
          >
            <Icon
              size={18}
              strokeWidth={activeSection === id ? 2.2 : 1.8}
            />
            <span>{label}</span>
            {activeSection === id && <span className="active-pill" />}
          </button>
        ))}
      </nav>

      {/* User Card at Bottom */}
      <div className="sidebar-bottom">
        <div
          className="user-card"
          onClick={onOpenProfile}
          role="button"
          tabIndex={0}
          aria-label="Open profile card"
        >
          <div className="avatar-small" style={{ background: avatarBg }}>
            <span>{userInitials}</span>
            <span className="avatar-online-dot" />
          </div>

          <div className="user-info">
            <strong>{username}</strong>
            <small>{user?.email || "Online"}</small>
          </div>

          <button
            className="user-logout-btn"
            onClick={handleLogout}
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;