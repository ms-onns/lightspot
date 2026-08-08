import { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import PlaceForm from "./PlaceForm";
import MapWidget from "./MapWidget";
import Loader from "./Loader";
import { mockSpots } from "../types";
import { Lightbulb } from "lucide-react";

export default function Main() {
  const [places, setPlaces] = useState<typeof mockSpots>([]);

  const handleAddPlace = (newPlace: { title: string; hasLight: boolean }) => {
    const newPlaceObject = {
      id: Date.now(),
      name: newPlace.title,
      hasLight: newPlace.hasLight,
      coordinates: [49.9935, 36.2304] as [number, number],
    };
    setPlaces([...places, newPlaceObject]);
  };

  const [showOnlyLight, setShowOnlyLight] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPlaces(mockSpots);
      } catch {
        setError("Не вдалося завантажити дані з сервера.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleFilter = () => {
    setShowOnlyLight(!showOnlyLight);
  };

  const displayedPlaces =
    showOnlyLight ? places.filter((place) => place.hasLight === true) : places;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-4 text-2xl font-bold text-center text-red-500">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <main className="flex-grow p-4 bg-gray-100">
      <PlaceForm onAddPlace={handleAddPlace} />
      <MapWidget
        spots={displayedPlaces}
        onMarkerClick={setActiveId}
        activeId={activeId}
      />

      <button
        onClick={handleFilter}
        className="flex items-center gap-2 px-4 py-2 mb-4 mt-6 font-bold transition-colors bg-yellow-400 rounded hover:bg-yellow-500"
      >
        <Lightbulb className="w-5 h-5" />
        Тільки зі світлом
      </button>

      <div className="flex flex-col gap-4">
        {displayedPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            id={place.id}
            name={place.name}
            hasLight={place.hasLight}
            isActive={place.id === activeId}
            onCardClick={setActiveId}
          />
        ))}
      </div>
    </main>
  );
}
