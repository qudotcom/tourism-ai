import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

/**
 * TourMap Component - Interactive map showing tour itinerary route
 * Uses vanilla Leaflet instead of react-leaflet to avoid context issues
 */
const TourMap = ({ itinerary }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !mapRef.current || !itinerary) return;

        // Filter out stops without coordinates
        const validStops = itinerary.filter(stop => stop.coordinates);

        if (validStops.length === 0) {
            setIsLoading(false);
            return;
        }

        // Dynamic import of Leaflet
        import('leaflet').then((L) => {
            // Clean up existing map instance
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }

            // Calculate center point
            const centerLat = validStops.reduce((sum, stop) => sum + stop.coordinates[0], 0) / validStops.length;
            const centerLng = validStops.reduce((sum, stop) => sum + stop.coordinates[1], 0) / validStops.length;

            // Create map
            const map = L.map(mapRef.current).setView([centerLat, centerLng], 7);
            mapInstanceRef.current = map;

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            // Add numbered markers
            validStops.forEach((stop, index) => {
                const icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="
            background-color: #1C448E;
            color: white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">${index + 1}</div>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                });

                const marker = L.marker(stop.coordinates, { icon }).addTo(map);

                marker.bindPopup(`
          <div style="text-align: center; min-width: 150px;">
            <div style="font-weight: bold; color: #1C448E; font-size: 13px; margin-bottom: 4px;">
              ${stop.day} - ${stop.title}
            </div>
            <div style="font-size: 11px; color: #666;">
              ${stop.desc}
            </div>
          </div>
        `);
            });

            // Add route line
            const routeCoordinates = validStops.map(stop => stop.coordinates);
            L.polyline(routeCoordinates, {
                color: '#C85A3F',
                weight: 3,
                opacity: 0.8,
                dashArray: '10, 5',
            }).addTo(map);

            setIsLoading(false);

            // Disable scroll wheel zoom for better UX
            map.scrollWheelZoom.disable();
        });

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [itinerary, isClient]);

    if (!isClient) {
        return (
            <div className="h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                🗺️ Chargement...
            </div>
        );
    }

    const validStops = itinerary?.filter(stop => stop.coordinates) || [];

    if (validStops.length === 0) {
        return (
            <div className="h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                📍 Aucune donnée GPS disponible pour cette tournée
            </div>
        );
    }

    return (
        <div className="h-80 md:h-96 rounded-xl overflow-hidden shadow-lg border-2 border-kech-primary/20 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 z-10 animate-pulse">
                    🗺️ Chargement de la carte...
                </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
        </div>
    );
};

export default TourMap;
