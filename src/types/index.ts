export interface Spot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  hasLight: boolean;
}

export const mockSpots: Spot[] = [
  { id: 1, name: "Buffet", lat: 50.0002, lng: 36.2435, hasLight: false },
  { id: 2, name: "1654", lat: 49.9918, lng: 36.2323, hasLight: false },
  { id: 3, name: "Sweeter", lat: 50.0021, lng: 36.2345, hasLight: false },
  { id: 4, name: "Pakufuda", lat: 50.0068, lng: 36.2245, hasLight: false },
];
