import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("lightspot_token");

    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}
