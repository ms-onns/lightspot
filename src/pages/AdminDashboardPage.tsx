import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("Завантаження даних...");

  useEffect(() => {
    const token = localStorage.getItem("lightspot_token");

    if (!token) {
      navigate("/admin");
      return;
    }

    const fetchProtectedData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setServerMessage(data.message);
        } else {
          localStorage.removeItem("lightspot_token");
          navigate("/admin");
        }
      } catch (error) {
        console.error("Помилка з'єднання з сервером:", error);
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div className="p-8 flex justify-center items-center h-[calc(100vh-64px)] bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold text-gray-800">{serverMessage}</h1>
      </div>
    </div>
  );
}
