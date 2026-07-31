import { useState } from "react";
import PlaceCard from "./PlaceCard";
import PlaceForm from "./PlaceForm";
import MapWidget from "./MapWidget";
import { mockSpots } from "../types";

export default function Main() {
  const [places, setPlaces] = useState(mockSpots);

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

  const handleFilter = () => {
    setShowOnlyLight(!showOnlyLight);
  };

  const displayedPlaces =
    showOnlyLight ? places.filter((place) => place.hasLight === true) : places;

  return (
    <main className="flex-grow p-4 bg-gray-100">
      <PlaceForm onAddPlace={handleAddPlace} />
      <MapWidget spots={displayedPlaces} />

      <button
        onClick={handleFilter}
        className="mt-6 mb-4 bg-yellow-400 px-4 py-2 rounded font-bold"
      >
        💡 Тільки зі світлом
      </button>

      <div className="flex flex-col gap-4">
        {displayedPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            name={place.name}
            hasLight={place.hasLight}
          />
        ))}
      </div>
    </main>
  );
}
