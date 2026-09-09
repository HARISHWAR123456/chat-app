import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./Layout.css";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {

    const [activeSection, setActiveSection] =
        useState<"chats" | "profile" | "settings">("chats");


    const handleProfileClick = () => {
        setActiveSection("profile");
    };


    return (
        <div className="app-layout">

            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />


            <div className="main-section">

                <Navbar
                    activeSection={activeSection}
                    onProfileClick={handleProfileClick}
                />


                <main className="page-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;