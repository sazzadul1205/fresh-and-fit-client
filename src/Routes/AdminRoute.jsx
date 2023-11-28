import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Orbitals } from "react-spinners-css";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32}/></div>;
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>

};

export default AdminRoute;
