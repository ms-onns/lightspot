import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
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

  const [viewState, setViewState] = useState({
    latitude: 49.9935,
    longitude: 36.2304,
    zoom: 12,
  });

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

      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-left" />

        {spots.map((spot) => (
          <Marker
            key={spot.id}
            latitude={spot.lat}
            longitude={spot.lng}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onMarkerClick(spot.id);
            }}
          >
            <div
              className={`cursor-pointer transition-transform duration-200 ${
                activeId === spot.id ? "scale-125" : "hover:scale-110"
              } ${spot.hasLight ? "text-yellow-400" : "text-gray-400"}`}
            >
              <MapPin className="w-8 h-8 fill-current drop-shadow-md" />

              {activeId === spot.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded shadow-lg whitespace-nowrap">
                  {spot.name}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
