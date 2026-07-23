interface PlaceCardProps {
  name: string;
  hasLight: boolean;
}

export default function PlaceCard({ name, hasLight }: PlaceCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-bold">{name}</p>
      <p>{hasLight ? "🟢 Є світло" : "🔴 Немає світла"}</p>
    </div>
  );
}