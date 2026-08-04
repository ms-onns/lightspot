import { Lightbulb, LightbulbOff } from "lucide-react";

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
        <div className="flex items-center gap-2 text-green-500 font-medium">
          <Lightbulb className="w-5 h-5" />
          <span>Є світло</span>
        </div>
      : <div className="flex items-center gap-2 text-red-500 font-medium">
          <LightbulbOff className="w-5 h-5" />
          <span>Немає світла</span>
        </div>
      }
    </div>
  );
}
