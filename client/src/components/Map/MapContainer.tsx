'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setPickupLocation, setDropLocation } from '@/features/tripSlice';
import { Location } from '@/types/trip';

const MapContainer = () => {
  const mapRef = useRef<L.Map | null>(null);
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const dropMarkerRef = useRef<L.Marker | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  const dispatch = useDispatch();
  const { pickupLocation, dropLocation, driverLocation, routePolylines, status } = useSelector(
    (state: RootState) => state.trip
  );

  // Use refs to access latest state in event handlers without triggering re-renders of the map initialization
  const stateRef = useRef({ pickupLocation, dropLocation, status });
  useEffect(() => {
    stateRef.current = { pickupLocation, dropLocation, status };
  }, [pickupLocation, dropLocation, status]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: false,
        attributionControl: false,
      }).setView([6.5244, 3.3792], 13); // Default to Lagos, Nigeria

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);

      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        
        // Prevent clicking while trip is in progress
        const { status, pickupLocation, dropLocation } = stateRef.current;
        if (status !== 'idle') return;

        if (!pickupLocation) {
          dispatch(setPickupLocation({ lat, lng }));
        } else if (!dropLocation) {
          dispatch(setDropLocation({ lat, lng }));
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Pickup Marker
    if (pickupLocation) {
      if (!pickupMarkerRef.current) {
        pickupMarkerRef.current = L.marker([pickupLocation.lat, pickupLocation.lng], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-[10px] text-white font-bold">P</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(mapRef.current);
      } else {
        pickupMarkerRef.current.setLatLng([pickupLocation.lat, pickupLocation.lng]);
      }
    } else if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }

    // Drop Marker
    if (dropLocation) {
      if (!dropMarkerRef.current) {
        dropMarkerRef.current = L.marker([dropLocation.lat, dropLocation.lng], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-[10px] text-white font-bold">D</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(mapRef.current);
      } else {
        dropMarkerRef.current.setLatLng([dropLocation.lat, dropLocation.lng]);
      }
    } else if (dropMarkerRef.current) {
      dropMarkerRef.current.remove();
      dropMarkerRef.current = null;
    }

    // Driver Marker
    if (driverLocation) {
      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker([driverLocation.lat, driverLocation.lng], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="w-8 h-8 bg-black rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white transform rotate-45">
                    <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                  </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          }),
        }).addTo(mapRef.current);
      } else {
        // Smooth transition
        driverMarkerRef.current.setLatLng([driverLocation.lat, driverLocation.lng]);
      }
      
      // Auto-pan to driver if moving
      if (status === 'moving') {
        mapRef.current.panTo([driverLocation.lat, driverLocation.lng], { animate: true });
      }
    }

    // Polyline
    if (routePolylines && routePolylines.length > 0) {
      const latlngs = routePolylines.map(p => [p.lat, p.lng] as L.LatLngExpression);
      if (!polylineRef.current) {
        polylineRef.current = L.polyline(latlngs, {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.8,
          lineJoin: 'round',
        }).addTo(mapRef.current);
      } else {
        polylineRef.current.setLatLngs(latlngs);
      }
    } else if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

  }, [pickupLocation, dropLocation, driverLocation, routePolylines, status]);

  return (
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-full z-0" />
      {/* Map Overlay Controls */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/20">
          <div className="w-10 h-10 flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full animate-pulse ${status === 'moving' ? 'bg-green-500' : 'bg-blue-500'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
