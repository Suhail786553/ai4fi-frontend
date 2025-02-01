import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) return <p className="text-center text-gray-300">Checking authentication...</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
