'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  setPickupLocation, 
  setDropLocation, 
  startTripTrigger, 
  resetTrip 
} from '@/features/tripSlice';
import { Button } from '@/components/ui/Button';
import { MapPin, Navigation, Flag, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TripControlPanel = () => {
  const dispatch = useDispatch();
  const { pickupLocation, dropLocation, status, isSocketConnected } = useSelector(
    (state: RootState) => state.trip
  );

  const handleStartTrip = () => {
    if (pickupLocation && dropLocation) {
      dispatch(startTripTrigger({ pickup: pickupLocation, drop: dropLocation }));
    }
  };

  const handleReset = () => {
    dispatch(resetTrip());
  };

  // Mocking location selection for now - in real app would use map selection
  const setMockPickup = () => {
    dispatch(setPickupLocation({ lat: 6.5244, lng: 3.3792 }));
  };

  const setMockDrop = () => {
    dispatch(setDropLocation({ lat: 6.6018, lng: 3.3515 }));
  };

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/20 p-6 overflow-hidden"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Where to?</h2>
              <p className="text-sm text-gray-500">Select your ride details</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isSocketConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {isSocketConnected ? 'Live' : 'Offline'}
            </div>
          </div>

          {/* Location Inputs */}
          <div className="space-y-3 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-0.5 h-1/2 bg-gray-100 z-0" />
            
            <button 
              onClick={setMockPickup}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${pickupLocation ? 'border-black bg-black/5' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pickupLocation ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                <MapPin size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Pickup Location</p>
                <p className="text-sm font-semibold truncate w-48">
                  {pickupLocation ? `${pickupLocation.lat.toFixed(4)}, ${pickupLocation.lng.toFixed(4)}` : 'Set Pickup Point'}
                </p>
              </div>
            </button>

            <button 
              onClick={setMockDrop}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${dropLocation ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${dropLocation ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Flag size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Drop Location</p>
                <p className="text-sm font-semibold truncate w-48">
                  {dropLocation ? `${dropLocation.lat.toFixed(4)}, ${dropLocation.lng.toFixed(4)}` : 'Set Destination'}
                </p>
              </div>
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              onClick={handleStartTrip}
              disabled={!pickupLocation || !dropLocation || status !== 'idle'}
              className="flex-1 h-14"
              isLoading={status === 'searching'}
            >
              <Navigation className="mr-2" size={18} />
              {status === 'idle' ? 'Request Ride' : status === 'searching' ? 'Searching...' : 'Trip in Progress'}
            </Button>
            
            {(pickupLocation || dropLocation) && (
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={handleReset}
                className="w-14 h-14"
              >
                <RotateCcw size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Status Overlay */}
        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="mt-6 pt-6 border-t border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center animate-pulse">
                    <Navigation className="text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-bold capitalize text-gray-900">{status}</p>
                    <p className="text-xs text-gray-500">Driver is on the way</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">4 min</p>
                  <p className="text-xs text-gray-500">ETA</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
