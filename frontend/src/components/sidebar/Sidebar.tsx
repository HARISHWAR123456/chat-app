import {
    Bot,
    CircleUserRound,
    MessageSquare,
    Settings,
} from "lucide-react";
import "./Sidebar.css";

type SidebarSection = "chats" | "profile" | "settings";

type SidebarProps = {
    activeSection: SidebarSection;
    onSectionChange: (section: SidebarSection) => void;
};

const sections = [
    {
        id: "chats",
        label: "Chats",
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
}: SidebarProps) {

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">
                <div className="brand-mark" aria-hidden="true">
                    <Bot size={21} strokeWidth={2.2} />
                </div>

                <span>Nexa</span>
            </div>


            <button
                className="new-chat-button"
                type="button"
                onClick={() => onSectionChange("chats")}
            >
                <MessageSquare size={18} strokeWidth={2.2} />

                <span>New chat</span>

                <span className="shortcut">
                    ⌘ K
                </span>
            </button>


            <nav
                className="sidebar-nav"
                aria-label="Main navigation"
            >

                <p className="nav-label">
                    Workspace
                </p>


                {sections.map(({ id, label, icon: Icon }) => (

                    <button
                        className={`nav-item ${
                            activeSection === id ? "active" : ""
                        }`}
                        key={id}
                        type="button"
                        onClick={() => onSectionChange(id)}
                        aria-current={
                            activeSection === id
                                ? "page"
                                : undefined
                        }
                    >
                        <Icon
                            size={18}
                            strokeWidth={
                                activeSection === id
                                    ? 2.3
                                    : 1.9
                            }
                        />

                        <span>
                            {label}
                        </span>

                    </button>

                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;