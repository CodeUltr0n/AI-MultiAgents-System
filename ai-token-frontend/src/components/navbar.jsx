import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")),
  );
  const [userEmail, setUserEmail] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"))?.email ?? null;
    } catch {
      return null;
    }
  });
  const [userRole, setUserRole] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser)?.role ?? null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(Boolean(token));

      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setUserRole(null);
        setUserEmail(null);
        return;
      }

      try {
        const parsed = JSON.parse(storedUser);
        setUserRole(parsed?.role ?? null);
        setUserEmail(parsed?.email ?? null);
      } catch {
        setUserRole(null);
        setUserEmail(null);
      }
    };

    syncAuthState();
    // 'storage' fires for cross-tab changes; 'auth-change' fires for same-tab changes
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-change", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-change", syncAuthState);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login");
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "btn btn-sm btn-primary"
      : "btn btn-sm btn-ghost";

  return (
    <header className="border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-6xl px-4">
        <div className="flex-1">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            AI Token Assistant
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/" className={linkClass("/")}>
                Tokens
              </Link>
              {userRole === "admin" && (
                <Link to="/admin" className={linkClass("/admin")}>
                  Admin
                </Link>
              )}
              {userEmail && (
                <span className="text-sm opacity-70">Hi, {userEmail}</span>
              )}
              <button type="button" className="btn btn-sm btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link to="/signup" className={linkClass("/signup")}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
