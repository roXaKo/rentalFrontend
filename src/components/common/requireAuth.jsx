import { getUser } from "../../services/authService";
import { useLocation, Navigate, Outlet } from 'react-router-dom';


export function RequireAuth (){
    const user = getUser()
    const location = useLocation()

    if (!user) return <Navigate to="/" state={{from:location}}/>
    return <Outlet />
}