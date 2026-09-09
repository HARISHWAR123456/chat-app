import Layout from "../components/layout/Layout";
import "../styles/Dashboard.css";
import Chat from "./chats/Chat";

function Dashboard() {
    return (
        <Layout>
            <Chat />
        </Layout>
    );
}

export default Dashboard;