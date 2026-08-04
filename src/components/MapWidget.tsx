import { useState, useRef, useEffect } from "react";
import type { Marker as LeafletMarker } from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import type { Spot } from "../types";

interface MapWidgetProps {
  spots: Spot[];
  onMarkerClick: (id: number) => void;
  activeId: number | null;
}

export default function MapWidget({
  spots,
  onMarkerClick,
  activeId,
}: MapWidgetProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const markersRef = useRef<Record<number, LeafletMarker | null>>({});

  useEffect(() => {
    if (activeId !== null && markersRef.current[activeId]) {
      markersRef.current[activeId].openPopup();
    }
  }, [activeId]);

  return (
    <div
      className={`bg-gray-100 transition-all duration-300 ${
        isFullscreen ?
          "fixed inset-0 z-[9999] rounded-none"
        : "relative w-full h-[40vh] rounded-xl z-0 overflow-hidden"
      }`}
    >
      <button
        onClick={() => setIsFullscreen((prev) => !prev)}
        className="absolute top-4 right-4 z-[1000] p-2 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        title={isFullscreen ? "Зменшити" : "На весь екран"}
      >
        {isFullscreen ?
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
          </svg>
        : <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        }
      </button>

      <MapContainer
        className="w-full h-full z-0"
        center={[49.9935, 36.2304]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.coordinates}
            eventHandlers={{ click: () => onMarkerClick(spot.id) }}
            ref={(markerElement: LeafletMarker | null) => {
              if (markerElement) {
                markersRef.current[spot.id] = markerElement;
              }
            }}
          >
            <Popup closeButton={false}>
              <span className="font-bold text-lg">{spot.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
