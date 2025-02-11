"use client"
import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngLiteral } from "leaflet"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix for marker icons
// delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src
})

type MapProps = {
    initialCenter?: LatLngLiteral
    onClick?: (location: { lat: number; lng: number }) => void
}

const Map: React.FC<MapProps> = ({ 
    initialCenter = { lat: 51.505, lng: -0.09 },
    onClick
}) => {
    const [markers, setMarkers] = useState<LatLngLiteral[]>([])

    const MapClickHandler = () => {
        useMapEvent("click", (e) => {
            const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng }
            
            // Call the external onClick handler if provided
            if (onClick) {
                onClick(newLocation)
            }

            // Add to markers list
            setMarkers(prev => [...prev, newLocation])
        })
        return null
    }

    const removeMarker = (index: number) => {
        setMarkers(prev => prev.filter((_, i) => i !== index))
    }

    const clearMarkers = () => {
        setMarkers([])
    }

    return (
        <div className="flex flex-col items-center w-full gap-4 p-4">
            <div className="w-full h-[600px] relative">
                <MapContainer
                    center={initialCenter}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full rounded-2xl"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    {markers.map((marker, index) => (
                        <Marker key={`${marker.lat}-${marker.lng}-${index}`} position={marker}>
                            <Popup>
                                <div>
                                    <p>Marker {index + 1}</p>
                                    <p>Lat: {marker.lat.toFixed(6)}</p>
                                    <p>Lng: {marker.lng.toFixed(6)}</p>
                                    <button
                                        onClick={() => removeMarker(index)}
                                        className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                                    >
                                        Remove Marker
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Markers ({markers.length})</h2>
                    <button
                        onClick={clearMarkers}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        disabled={markers.length === 0}
                    >
                        Clear All
                    </button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {markers.map((marker, index) => (
                        <div 
                            key={`list-${marker.lat}-${marker.lng}-${index}`}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                            <div>
                                <p className="font-medium">Marker {index + 1}</p>
                                <p className="text-sm text-gray-600">
                                    {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
                                </p>
                            </div>
                            <button
                                onClick={() => removeMarker(index)}
                                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {markers.length === 0 && (
                        <p className="text-gray-500 text-center">Click on the map to add markers</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Map