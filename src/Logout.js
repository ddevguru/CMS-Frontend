import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // ✅ Clear session storage & local storage
    localStorage.clear();
    sessionStorage.clear();

    // ✅ Redirect to login page after logout
    navigate("/login", { replace: true });

    // ✅ Reload page to clear cached user data
    window.location.reload();
  }, [navigate]);

  return null; // 🔥 Prevents unnecessary UI rendering
};

export default Logout;
