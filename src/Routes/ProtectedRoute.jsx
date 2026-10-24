import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const jwt = localStorage.getItem("jwt");

  if (!jwt||jwt==undefined) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;