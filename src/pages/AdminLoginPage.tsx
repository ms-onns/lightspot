import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("lightspot_token", data.token);
        console.log("Токен успішно збережено в localStorage!", data.token);
        navigate("/admin/dashboard");
      } else {
        console.error("Помилка авторизації:", data.error);
      }
    } catch (error) {
      console.error("Помилка з'єднання:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-white p-8 rounded-xl shadow-lg w-full max-w-md gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Вхід у систему
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-gray-700"
          >
            Електронна пошта або логін
          </label>
          <input
            type="email"
            id="username"
            name="username"
            autoComplete="username"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all bg-gray-50 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all bg-gray-50 text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Увійти
        </button>
      </form>
    </div>
  );
}
