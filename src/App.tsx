import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import SpotPage from "./pages/SpotPage";
import Admin from "./pages/AdminPage";

export default function App() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/spot/:id" element={<SpotPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
