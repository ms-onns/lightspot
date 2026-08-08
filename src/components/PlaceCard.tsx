import { Lightbulb, LightbulbOff } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceCardProps {
  id: number;
  name: string;
  hasLight: boolean;
  isActive: boolean;
  onCardClick: (id: number) => void;
}

export default function PlaceCard({
  name,
  hasLight,
  isActive,
  id,
  onCardClick,
}: PlaceCardProps) {
  return (
    <div
      onClick={() => onCardClick(id)}
      className={`bg-white p-4 rounded shadow ${
        isActive ? "border-4 border-yellow-400" : ""
      }`}
    >
      <p className="font-bold text-lg mb-2">{name}</p>

      {hasLight ?
        <div className="flex items-center gap-2 font-medium text-green-500">
          <Lightbulb className="w-5 h-5" />
          <span>Є світло</span>
        </div>
      : <div className="flex items-center gap-2 font-medium text-red-500">
          <LightbulbOff className="w-5 h-5" />
          <span>Немає світла</span>
        </div>
      }

      <Link
        to={`/spot/${id}`}
        className="block w-full px-4 py-2 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Детальніше
      </Link>
    </div>
  );
}
