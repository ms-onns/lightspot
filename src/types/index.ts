export interface Spot {
  id: number;
  name: string;
  coordinates: [number, number];
  hasLight: boolean;
}

export const mockSpots: Spot[] = [
  {
    id: 1,
    name: "Buffet",
    coordinates: [50.0002, 36.2435],
    hasLight: false,
  },
  {
    id: 2,
    name: "1654",
    coordinates: [49.9918, 36.2323],
    hasLight: false,
  },
  {
    id: 3,
    name: "Sweeter",
    coordinates: [50.0021, 36.2345],
    hasLight: false,
  },
  {
    id: 4,
    name: "Pakufuda",
    coordinates: [50.0068, 36.2245],
    hasLight: false,
  },
];
