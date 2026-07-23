import { useState } from "react";

interface PlaceFormProps {
  onAddPlace: (newPlace: { title: string; hasLight: boolean }) => void;
}

export default function PlaceForm({ onAddPlace }: PlaceFormProps) {
  const [placeName, setPlaceName] = useState("");
  const [hasLight, setHasLight] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    // -------------------- !
    if (placeName.trim() === "") {
      return;
    }

    onAddPlace({
      title: placeName,
      hasLight: hasLight,
    });

    setPlaceName("");
    setHasLight(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6 p-4 bg-white rounded-lg shadow"
    >
      <input
        type="text"
        placeholder="Назва закладу..."
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all text-sm"
      />

      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
        <input
          type="checkbox"
          className="w-4 h-4 accent-yellow-400 cursor-pointer"
          checked={hasLight}
          onChange={(e) => setHasLight(e.target.checked)}
        />
        <span>Є світло/генератор</span>
      </label>

      <button
        type="submit"
        className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors mt-2 text-sm"
      >
        Зберегти заклад
      </button>
    </form>
  );
}
