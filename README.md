# Real-Time Location Tracking App (MERN + TypeScript)

## Overview

This project is a **real-time location tracking web application** built using the **MERN stack with TypeScript**.

The application simulates a moving driver (or delivery agent) traveling from a **pickup location** to a **drop location** while updating their position on a map in real time.

The system demonstrates how modern applications like ride-hailing platforms track location updates using **WebSockets**, interactive maps, and persistent storage.

Users can select pickup and drop points on an interactive map, start a trip, and watch a marker move along the route while location updates are streamed from the backend every second.

---

# Demo Features

## 1. Interactive Map

The application displays an interactive map where users can:

- View their **current location**
- Select a **pickup location**
- Select a **drop location**
- See **markers** for pickup, drop, and the moving driver
- View the **route between pickup and drop**

The map is powered by **OpenStreetMap** using **Leaflet**.

---

## 2. Real-Time Location Tracking

The backend simulates a moving driver traveling between the selected pickup and drop locations.

### Behavior

- The driver marker updates **every 1 second**
- Movement is streamed through **WebSockets**
- The marker moves **smoothly across the map**

### Trip Lifecycle

---

## 3. WebSocket Communication

The system uses **Socket.IO** to handle real-time communication between the frontend and backend.

### Client → Server Events

Starts the trip simulation.

### Server → Client Events

The server continuously emits new location coordinates which update the driver marker in the UI.

---

## 4. Location History Storage

Each location update is stored in **MongoDB**.

This allows the system to keep a record of the entire trip path.

Example stored data:

---

# Tech Stack

## Frontend

- React
- TypeScript
- Redux Toolkit
- React Leaflet (Map rendering)
- Socket.IO Client

## Backend

- Node.js
- Express
- TypeScript
- Socket.IO
- MongoDB
- Mongoose

## Other Tools

- OpenStreetMap
- Geolocation API
- Docker (optional)

---

# Project Architecture
            React + Redux
                  │
                  │ HTTP
                  ▼
           Express API
                  │
                  │ WebSocket
                  ▼
             Socket.IO
                  │
                  ▼
              MongoDB
  
The frontend communicates with the backend through both **HTTP requests** and **WebSockets**.
