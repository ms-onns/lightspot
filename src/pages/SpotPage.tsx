import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, LightbulbOff } from "lucide-react";

interface Place {
  id: number;
  name: string;
  hasLight: boolean;
}

export default function SpotPage() {
  const { id } = useParams<{ id: string }>();
  const [spot, setSpot] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setSpot({
          id: Number(id),
          name: `Кав'ярня #${id}`,
          hasLight: Number(id) % 2 === 0,
        });
      } catch (error) {
        console.error("Помилка завантаження", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpot();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-600 animate-pulse">
          Шукаємо заклад...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">{spot?.name}</h1>

      <div className="mb-8">
        {spot?.hasLight ?
          <div className="flex items-center gap-2 px-4 py-2 font-bold text-green-700 bg-green-100 rounded-lg">
            <Lightbulb className="w-6 h-6" /> Є світло
          </div>
        : <div className="flex items-center gap-2 px-4 py-2 font-bold text-red-700 bg-red-100 rounded-lg">
            <LightbulbOff className="w-6 h-6" /> Немає світла
          </div>
        }
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-2 font-bold text-gray-700 transition-colors bg-white border border-gray-300 rounded hover:bg-gray-50"
      >
        <ArrowLeft className="w-5 h-5" />
        На головну
      </Link>
    </div>
  );
}
