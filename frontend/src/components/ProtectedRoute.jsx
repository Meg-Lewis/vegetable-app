import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Text from "./Text";

export default function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();

  // show a loading message instead of redirecting immediately
  if (loading) return <Text size="medium">Checking authentication...</Text>;

  // redirect only if user is truly not logged in
  if (!user || !token) return <Navigate to="/login" replace />;

  return children;
}
