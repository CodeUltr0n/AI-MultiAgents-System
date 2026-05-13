import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Checkauth = ({ children, protectedRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (protectedRoute) {
      if (!token) {
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
      }
    } else {
      if (token) {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
      }
    }
  }, [navigate, protectedRoute, location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return children;
};

export default Checkauth;