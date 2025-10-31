// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While Firebase is checking the session, don't redirect.
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Checking authentication...</div>;
  }

  // If after loading, there is still no user, *then* redirect.
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
