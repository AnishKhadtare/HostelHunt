// https://pngimg.com/uploads/google_maps_pin/google_maps_pin_PNG76.png
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

const MapComponent = ({ latitude, longitude }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [transport, setTransport] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showTransport, setShowTransport] = useState(false);

  const hostelIcon = new L.Icon({
    iconUrl: 'https://pngimg.com/uploads/google_maps_pin/google_maps_pin_PNG76.png', // Update with your actual red marker icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const overpassUrl = 'https://overpass-api.de/api/interpreter';

      const query = `
        [out:json];
        (
          node["amenity"="restaurant"](around:1000,${latitude},${longitude});
          node["public_transport"](around:1000,${latitude},${longitude});
        );
        out body;
      `;

      try {
        const response = await axios.get(overpassUrl, {
          params: { data: query },
        });
        const elements = response.data.elements;

        // Filter restaurants
        const fetchedRestaurants = elements.filter((el) =>
          el.tags.amenity === 'restaurant'
        );

        // Filter transportation with a specific name and include type
        const filteredTransport = elements.filter((el) => 
          el.tags.public_transport && el.tags.name && el.tags.name.toLowerCase() !== 'transport facility'
        );

        setRestaurants(fetchedRestaurants);
        setTransport(filteredTransport);
      } catch (error) {
        console.error('Error fetching nearby places from OpenStreetMap:', error);
      }
    };

    fetchNearbyPlaces();
  }, [latitude, longitude]);

  return (
    <div>
      <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Hostel Marker with Red Icon */}
        <Marker position={[latitude, longitude]} icon={hostelIcon}>
          <Popup>Hostel Location</Popup>
        </Marker>

        {/* Nearby Restaurants - Only show when toggled */}
        {showRestaurants && restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            position={[restaurant.lat, restaurant.lon]}
          >
            <Popup>{restaurant.tags.name || 'Restaurant'}</Popup>
          </Marker>
        ))}

        {/* Nearby Transportation Facilities - Only show when toggled */}
        {showTransport && transport.map((facility, index) => (
          <Marker
            key={index}
            position={[facility.lat, facility.lon]}
          >
            <Popup>
              {facility.tags.name || 'Transport Facility'}<br />
              {console.log("Hello", facility.tags)}
              Type: {facility.tags.public_transport}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="flex space-x-4 mt-4">
        {/* Button to toggle restaurant markers */}
        <button
          onClick={() => setShowRestaurants(!showRestaurants)}
          className={`px-4 py-2 rounded ${showRestaurants ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {showRestaurants ? 'Hide Restaurants' : 'Show Restaurants'}
        </button>

        {/* Button to toggle transport markers */}
        <button
          onClick={() => setShowTransport(!showTransport)}
          className={`px-4 py-2 rounded ${showTransport ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {showTransport ? 'Hide Transport' : 'Show Transport'}
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
