import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

function ProtectedRoute() {

    const user = useAppSelector(
        state => state.user.user
    );

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;