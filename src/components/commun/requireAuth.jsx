import { getUser } from "../../services/authService";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export function RequireAuth() {
  const user = getUser();
  const location = useLocation();
  if (!user) {
    toast("Please login to use this function");
    
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
}
