import { Middleware } from '@reduxjs/toolkit';
import { socketService } from '../services/socketClient';
import { 
  setSocketConnected, 
  setTripStatus, 
  setDriverLocation, 
  setError 
} from './tripSlice';

export const socketMiddleware: Middleware = (store) => {
  const socket = socketService.connect();

  socket.on('connect', () => {
    store.dispatch(setSocketConnected(true));
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    store.dispatch(setSocketConnected(false));
    console.log('Disconnected from WebSocket server');
  });

  socket.on('connect_error', (error) => {
    store.dispatch(setError('Connection failed: ' + error.message));
  });

  // Handle trip events
  socket.on('trip:started', (data) => {
    store.dispatch(setTripStatus('moving'));
    if (data.driverLocation) {
      store.dispatch(setDriverLocation(data.driverLocation));
    }
  });

  socket.on('trip:update', (data) => {
    if (data.driverLocation) {
      store.dispatch(setDriverLocation(data.driverLocation));
    }
    if (data.status) {
      store.dispatch(setTripStatus(data.status));
    }
  });

  return (next) => (action: any) => {
    // Intercept specific actions to emit via socket
    if (action.type === 'trip/startTripTrigger') {
      const { pickup, drop } = action.payload;
      socketService.emit('trip:start', { pickup, drop });
    }

    return next(action);
  };
};
