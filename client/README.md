# Real-Time Location Tracking Frontend

This is a production-grade frontend for a real-time location tracking system, built with Next.js, TypeScript, Redux Toolkit, and Socket.IO.

## Features

- **Interactive Map**: Built with Leaflet for smooth zooming and panning.
- **Real-Time Updates**: Live driver movement simulation via WebSockets.
- **Trip Management**: Select pickup/drop locations and track trip status.
- **Modern UI**: Elegant, minimal design using Tailwind CSS and Framer Motion.
- **Responsive**: Mobile-first architecture.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **State**: Redux Toolkit
- **Real-time**: Socket.IO Client
- **Maps**: Leaflet / React-Leaflet
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- Backend server running (default: `http://localhost:5000`)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js pages and layouts.
- `src/components`: Reusable UI and Map components.
- `src/features`: Redux slices and middleware.
- `src/hooks`: Custom React hooks (Geolocation).
- `src/services`: Singleton services (Socket.IO).
- `src/store`: Redux store configuration.
- `src/types`: TypeScript interfaces and types.
