import { useState } from "react";
import PlaceCard from "./PlaceCard";
import PlaceForm from "./PlaceForm";

export default function Main() {
  const [places, setPlaces] = useState([
    { id: 1, name: "Кав'ярня 'Світло'", hasLight: true },
    { id: 2, name: "Коворкінг 'Генератор'", hasLight: true },
    { id: 3, name: "Піцерія на розі", hasLight: false },
  ]);

  const handleAddPlace = (newPlace: { title: string; hasLight: boolean }) => {
    const newPlaceObject = {
      id: Date.now(),
      name: newPlace.title,
      hasLight: newPlace.hasLight,
    };

    setPlaces([...places, newPlaceObject]);
  };

  const [showOnlyLight, setShowOnlyLight] = useState(false);

  const handleFilter = () => {
    setShowOnlyLight(!showOnlyLight);
  };

  const displayedPlaces = showOnlyLight
    ? places.filter((place) => place.hasLight === true)
    : places;

  return (
    <main className="flex-grow p-4 bg-gray-100">
      <PlaceForm onAddPlace={handleAddPlace} />

      <button
        onClick={handleFilter}
        className="mb-4 bg-yellow-400 px-4 py-2 rounded font-bold"
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
