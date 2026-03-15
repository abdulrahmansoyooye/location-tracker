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
import { MapPin, Navigation, Flag, RotateCcw, ChevronUp, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import debounce from 'lodash/debounce';

export const TripControlPanel = () => {
  const dispatch = useDispatch();
  const { pickupLocation, dropLocation, status, isSocketConnected, distanceInfo } = useSelector(
    (state: RootState) => state.trip
  );
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reverse geocode when locations change via map click
  useEffect(() => {
    const fetchAddress = async (loc: any, setter: (val: string) => void) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`);
        const data = await res.json();
        setter(data.display_name || `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`);
      } catch (e) {
        setter(`${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`);
      }
    };

    if (pickupLocation && !pickupAddress.includes(pickupLocation.lat.toFixed(4))) {
      fetchAddress(pickupLocation, setPickupAddress);
    }
    if (dropLocation && !dropAddress.includes(dropLocation.lat.toFixed(4))) {
      fetchAddress(dropLocation, setDropAddress);
    }

    if (!pickupLocation) setPickupAddress('');
    if (!dropLocation) setDropAddress('');
  }, [pickupLocation, dropLocation]);

  // Handle address searches
  const handleSearch = useMemo(
    () => debounce(async (query: string, setSuggestions: (val: any[]) => void) => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
        const data = await res.json();
        setSuggestions(data);
      } catch (e) {
        console.error('Search error:', e);
      }
    }, 500),
    []
  );

  const selectSuggestion = useCallback((suggestion: any, type: 'pickup' | 'drop') => {
    const loc = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };
    if (type === 'pickup') {
      dispatch(setPickupLocation(loc));
      setPickupAddress(suggestion.display_name);
      setPickupSuggestions([]);
    } else {
      dispatch(setDropLocation(loc));
      setDropAddress(suggestion.display_name);
      setDropSuggestions([]);
    }
  }, [dispatch]);

  // Auto-expand when locations are selected or trip starts
  useEffect(() => {
    if (pickupLocation || dropLocation || status !== 'idle') {
      setIsExpanded(true);
    }
  }, [pickupLocation, dropLocation, status]);

  const handleStartTrip = () => {
    if (pickupLocation && dropLocation) {
      dispatch(startTripTrigger({ pickup: pickupLocation, drop: dropLocation }));
    }
  };

  const handleReset = () => {
    dispatch(resetTrip());
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: isExpanded ? 0 : status === 'idle' && !pickupLocation ? 200 : 250, 
          opacity: 1 
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden"
      >
        {/* Toggle Handle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full pt-3 pb-1 flex justify-center hover:bg-black/5 transition-colors group"
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full group-hover:bg-gray-300 transition-colors" />
        </button>

        <div className={`p-6 pt-2 space-y-6 transition-all duration-300 ${!isExpanded ? 'opacity-40 scale-95 origin-top' : 'opacity-100 scale-100'}`}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div onClick={() => setIsExpanded(true)} className="cursor-pointer">
              <h2 className="text-xl font-bold text-gray-900">
                {status === 'idle' ? 'Where to?' : 'Trip Details'}
              </h2>
              <p className="text-sm text-gray-500">
                {status === 'idle' ? 'Select your ride details' : 'Your ride is in progress'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {mounted && (
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isSocketConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isSocketConnected ? 'Live' : 'Offline'}
                </div>
              )}
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isExpanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronUp size={20} className="text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Location Selection Inputs */}
          <div className="space-y-4 relative">
            {/* Connection line between inputs */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-100 z-0" />
            
            <div className="relative z-10 space-y-1 group">
              <Input 
                placeholder="Enter pickup location"
                value={pickupAddress}
                onChange={(e) => {
                  setPickupAddress(e.target.value);
                  handleSearch(e.target.value, setPickupSuggestions);
                }}
                icon={<MapPin size={18} className={pickupLocation ? 'text-black' : 'text-gray-400'} />}
                className={pickupLocation ? 'border-black bg-black/[0.02] pr-12' : 'pr-12'}
              />
              {pickupAddress && (
                <button 
                  onClick={() => {
                    setPickupAddress('');
                    dispatch(setPickupLocation(null));
                    setPickupSuggestions([]);
                  }}
                  className="absolute right-4 top-4 text-gray-400 hover:text-black transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <AnimatePresence>
                {pickupSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full bg-white rounded-2xl shadow-xl border border-gray-100 mt-1 max-h-60 overflow-y-auto"
                  >
                    {pickupSuggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(s, 'pickup')}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors border-b last:border-0 border-gray-50"
                      >
                        <Search size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">{s.display_name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 space-y-1 group">
              <Input 
                placeholder="Enter drop location"
                value={dropAddress}
                disabled={!pickupLocation}
                onChange={(e) => {
                  setDropAddress(e.target.value);
                  handleSearch(e.target.value, setDropSuggestions);
                }}
                icon={<Flag size={18} className={dropLocation ? 'text-red-500' : 'text-gray-400'} />}
                className={dropLocation ? 'border-red-500 bg-red-50/30 pr-12' : 'pr-12'}
              />
              {dropAddress && (
                <button 
                  onClick={() => {
                    setDropAddress('');
                    dispatch(setDropLocation(null));
                    setDropSuggestions([]);
                  }}
                  className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <AnimatePresence>
                {dropSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full bg-white rounded-2xl shadow-xl border border-gray-100 mt-1 max-h-60 overflow-y-auto"
                  >
                    {dropSuggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(s, 'drop')}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors border-b last:border-0 border-gray-50"
                      >
                        <Search size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">{s.display_name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Route Info Summary */}
          {distanceInfo && status === 'idle' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-blue-500" />
                <span className="text-xs font-bold text-gray-700">{distanceInfo.distanceText}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-700">{distanceInfo.durationText}</span>
              </div>
            </motion.div>
          )}

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
                  <p className="text-sm font-bold text-gray-900">{distanceInfo?.durationText || '4 min'}</p>
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
