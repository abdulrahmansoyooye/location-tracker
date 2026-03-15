export type Location = {
  lat: number;
  lng: number;
};

export type TripStatus = 'idle' | 'searching' | 'started' | 'moving' | 'completed';

export interface DistanceInfo {
  distanceText: string;
  durationText: string;
  distanceValue: number;
  durationValue: number;
}

export interface TripState {
  pickupLocation: Location | null;
  dropLocation: Location | null;
  driverLocation: Location | null;
  status: TripStatus;
  routePolylines: Location[];
  distanceInfo: DistanceInfo | null;
  isSocketConnected: boolean;
  error: string | null;
}
export interface NominatimSuggestion {
  lat: string;
  lon: string;
  display_name: string;
  place_id: number;
  type: string;
}
