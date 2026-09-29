import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Plus, Edit3, Trash2 } from "lucide-react";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("lightspot_token");
    if (!token) {
      navigate("/admin");
      return;
    }
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("lightspot_token");
    navigate("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-8 h-8 border-4 border-zinc-600 border-t-zinc-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Header */}
        <header className="flex justify-between items-end border-b-2 border-zinc-800 pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-widest uppercase">
              Панель керування локаціями
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              ID Користувача: admin_x94j / Рівень доступу: Власник
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-950 font-bold hover:bg-zinc-300 transition-colors">
              <Plus size={18} />
              Додати заклад
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-4 mb-4">
          <div className="col-span-4">Назва та Адреса</div>
          <div className="col-span-6">Статуси</div>
          <div className="col-span-2 text-right">Дії</div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {/* Item 1 */}
          <div className="grid grid-cols-12 gap-4 items-center bg-zinc-900/50 border border-zinc-800 p-4 hover:border-zinc-600 transition-colors">
            <div className="col-span-4">
              <h2 className="text-lg font-bold text-zinc-100">
                Кав'ярня "Лампа"
              </h2>
              <p className="text-sm text-zinc-400 mt-1">вул. Наукова, 12</p>
              <p className="text-xs text-zinc-600 mt-1">ID: a1b2c3d4...</p>
            </div>

            <div className="col-span-6 grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></span>
                <span className="text-sm text-zinc-200">Є світло</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></span>
                <span className="text-sm text-zinc-200">Генератор</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"></span>
                <span className="text-sm text-zinc-200">Інтернет</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"></span>
                <span className="text-sm text-zinc-200">Зарядка</span>
              </div>
            </div>

            <div className="col-span-2 flex justify-end gap-3">
              <button className="text-zinc-500 hover:text-zinc-200 transition-colors">
                <Edit3 size={18} />
              </button>
              <button className="text-zinc-500 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="grid grid-cols-12 gap-4 items-center bg-zinc-900/50 border border-zinc-800 p-4 hover:border-zinc-600 transition-colors">
            <div className="col-span-4">
              <h2 className="text-lg font-bold text-zinc-100">
                Коворкінг "Спейс"
              </h2>
              <p className="text-sm text-zinc-400 mt-1">пр. Перемоги, 45</p>
              <p className="text-xs text-zinc-600 mt-1">ID: x9y8z7w6...</p>
            </div>

            <div className="col-span-6 grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex items-center gap-2 opacity-50">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></span>
                <span className="text-sm text-zinc-400">Немає світла</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <span className="w-3 h-3 rounded-full border border-zinc-600"></span>
                <span className="text-sm text-zinc-500">
                  (немає генератора)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"></span>
                <span className="text-sm text-zinc-200">Інтернет</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <span className="w-3 h-3 rounded-full border border-zinc-600"></span>
                <span className="text-sm text-zinc-500">(немає зарядки)</span>
              </div>
            </div>

            <div className="col-span-2 flex justify-end gap-3">
              <button className="text-zinc-500 hover:text-zinc-200 transition-colors">
                <Edit3 size={18} />
              </button>
              <button className="text-zinc-500 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
