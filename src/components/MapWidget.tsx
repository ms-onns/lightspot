import { MapContainer, TileLayer } from "react-leaflet";

export default function MapWidget() {
  return (
    <MapContainer
      className="w-full h-[40vh] rounded-xl z-0"
      center={[49.9935, 36.2304]}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
