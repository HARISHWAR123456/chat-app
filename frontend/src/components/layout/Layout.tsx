import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import NewChatModal from "../modals/NewChatModal";
import ProfileModal from "../modals/ProfileModal";
import SettingsModal from "../modals/SettingsModal";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [activeSection, setActiveSection] = useState<"chats" | "profile" | "settings">("chats");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global shortcut Cmd+K or Ctrl+K for New Chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsNewChatOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSectionChange = (section: "chats" | "profile" | "settings") => {
    setActiveSection(section);
    setIsMobileSidebarOpen(false);
    if (section === "profile") {
      setIsProfileOpen(true);
    } else if (section === "settings") {
      setIsSettingsOpen(true);
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile sidebar overlay backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`sidebar-container ${isMobileSidebarOpen ? "mobile-open" : ""}`}>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onOpenNewChat={() => setIsNewChatOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      </div>

      <div className="main-section">
        <Navbar
          activeSection={activeSection}
          onProfileClick={() => setIsProfileOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="page-content">{children}</main>
      </div>

      {/* Interactive Global Modals */}
      <NewChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default Layout;