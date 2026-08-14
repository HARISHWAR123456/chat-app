import { useAppSelector } from "../app/hooks";
import "../styles/Dashboard.css";

function Dashboard() {

    const user = useAppSelector((state) => state.user.user);

    const displayName = user?.username || user?.email || "there";

    return (
        <section className="chat-section">

            <header className="chat-header">

                <h1>Chat</h1>

                <p className="chat-subtitle">
                    Welcome back, {displayName}. Pick a conversation to get started.
                </p>

            </header>

            <div className="chat-body">

                <div className="chat-panel chat-panel--list">

                    <h2>Conversations</h2>

                    <p className="chat-empty">
                        No conversations yet.
                    </p>

                </div>

                <div className="chat-panel chat-panel--thread">

                    <p className="chat-empty">
                        Select a conversation to see its messages.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Dashboard;
