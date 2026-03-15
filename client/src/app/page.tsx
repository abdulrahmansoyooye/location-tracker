'use client';

import MapContainer from '@/components/Map';
import { TripControlPanel } from '@/components/Trip/TripControlPanel';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPickupLocation } from '@/features/tripSlice';

export default function Home() {
  const { location, error } = useGeolocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      dispatch(setPickupLocation(location));
    }
  }, [location, dispatch]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapContainer />
      </div>

      {/* Control Overlay */}
      <TripControlPanel />

      {/* Floating Error Toast */}
      {error && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </main>
  );
}
