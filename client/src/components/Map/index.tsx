'use client';

import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('./MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Initializing Tracker Map...</p>
      </div>
    </div>
  ),
});

export default MapContainer;
